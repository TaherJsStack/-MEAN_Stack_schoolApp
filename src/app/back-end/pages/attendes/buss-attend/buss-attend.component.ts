import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AttendesService } from 'src/app/providers/attendes';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { BusService } from 'src/app/providers/bus.service';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  _id: string;
  name: string;
  position: number;
}

@Component({
  selector: 'app-buss-attend',
  templateUrl: './buss-attend.component.html',
  // styleUrls: ['./buss-attend.component.scss']
})
export class BussAttendComponent implements OnInit {


  ELEMENT_DATA: PeriodicElement[];

  displayedColumns: string[] = ['select', 'position', '_id', 'name'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  selection = new SelectionModel(true, []);


  editMode;

  busInfo;
  Subscription: Subscription;
  levels;
  filterStage;
  filterLevel;

  studentsAttend = [];

  monthNames = ["January", "February", "March", "April", "May", "June",
  "July",    "August",   "September", "October", "November", "December"];
  date = new Date();
  attendYear  = this.date.getFullYear();
  attendMonth = this.monthNames[this.date.getMonth()];
  attendDay   = this.date.getDay()+1;
  isSelectedStudents = false;
  isBusSpinner = true;

  constructor(
               private BusService: BusService,
               private FlashMessagesService: FlashMessagesService,
               private AttendesService: AttendesService,
               private route: ActivatedRoute,
               private Router: Router ) { }

  ngOnInit() {

    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
      if ( paramMap.has('id') ) {
          this.Subscription = this.BusService.getLine(paramMap.get('id'))
          .subscribe( busData => {
            console.log("busData.bus =>", busData.bus)
            this.busInfo = busData.bus;
            this.dataSource = new MatTableDataSource(busData.bus.students);
            this.isBusSpinner = false;
          })
        } else {
       
        }
      });
  }

  studentCheck(id, name) {
    const student = {id: id, name: name}
    let isStudent = this.studentsAttend.findIndex(s => { return s.id == id})    
    if (isStudent !== -1) {
      this.studentsAttend.splice(isStudent, 1);
    } else {
      this.studentsAttend.push(student);  
    }
    console.log('studentsAttend =>', this.studentsAttend)
  }
  
  stageChange(e) {
    console.log('-=============>', e)
    if (e == 'preschool') {
      this.levels = ['level 1', 'level 2'];
    } else if (e == 'elementary') {
      this.levels = ['level 1', 'level 2', 'level 3', 'level 4', 'level 5', 'level 6'];
    } else if (e == 'middle' || e == 'high') {
      this.levels = ['level 1', 'level 2', 'level 3'];
    }
    this.filterStage   = e;
  }

  levelChange(e) {
    this.filterLevel = e;
  }
  
  onSave(attend: NgForm) {
    // console.log('onSave =>', attend.value);
    // console.log(' studentsAttend length =>', this.studentsAttend.length);

    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July",    "August",   "September", "October", "November", "December"];
    const date = new Date();
    let attendYear  = date.getFullYear();
    let attendMonth = monthNames[date.getMonth()];
    let attendDay   = date.getDate();

    if (this.selection.selected.length > 0) {
      const newbussAttend = {
        area:       attend.value.area,
        busNo:      attend.value.busNo,
        drivar:     attend.value.drivar,
        supervisor: attend.value.supervisor,
        students:   this.selection.selected,
        notes:      attend.value.notes,
        year:       attendYear,
        month:      attendMonth,
        day:        attendDay,
        type:       "bus Attend",
        busId:      this.busInfo._id
      }

      console.log('newbussAttend =>', newbussAttend);

      this.AttendesService.addBusAttend(newbussAttend)
      .subscribe(
        msg => {
          this.AttendesService.getAllClassesAttend();
          this.FlashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
          this.Router.navigate(['/backend/attendes/allAttends'])
          attend.reset();
          this.isSelectedStudents = false;
        },
        err => {
          console.log('err.error=>', err.error);
          this.FlashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        }); 
    } else {
      this.isSelectedStudents = true;
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    // console.log('this.selection =>', this.selection.selected)  
    if (!row) {
      this.isSelectedStudents = false;
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  
  OnDestroy() { 
    this.Subscription.unsubscribe();
  }

}
