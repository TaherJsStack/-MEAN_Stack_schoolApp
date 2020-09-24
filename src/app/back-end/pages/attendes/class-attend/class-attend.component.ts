import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClassesService } from 'src/app/providers/classes.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AttendesService } from 'src/app/providers/attendes';
import { FlashMessagesService } from 'angular2-flash-messages';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  _id: string;
  name: string;
  position: number;
}

@Component({
  selector: 'app-class-attend',
  templateUrl: './class-attend.component.html',
  // styleUrls: ['./class-attend.component.scss']
})
export class ClassAttendComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[];

  displayedColumns: string[] = ['select', 'position', '_id', 'name'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  selection = new SelectionModel(true, []);

  editParent;
  editMode;
  
  classInfo;
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
  isClassSpinner = true;
  isSelectedStudents = false;

  constructor(
              private FlashMessagesService: FlashMessagesService,
              private AttendesService: AttendesService,
              private ClassesService: ClassesService,
              private route: ActivatedRoute,
              private Router: Router
            ) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
      if ( paramMap.has('id') ) {
          this.Subscription = this.ClassesService.getClass(paramMap.get('id'))
          .subscribe( classData => {
            this.isClassSpinner = false;
            this.classInfo      = classData.class;
            this.dataSource     = new MatTableDataSource(this.classInfo.students);
          })
        } else { }
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
  }
  
  stageChange(e) {
    // console.log('-=============>', e)
    if (e == 'preschool') {
      this.levels = ['level 1', 'level 2'];
    } else if (e == 'elementary') {
      this.levels = ['level 1', 'level 2', 'level 3', 'level 4', 'level 5', 'level 6'];
    } else if (e == 'middle' || e == 'high') {
      this.levels = ['level 1', 'level 2', 'level 3'];
    }
    this.filterStage   = e;
    // this.studentsSrv.studentsFillterStageAndLevel(this.filterStage, this.filterLevel)
    // .subscribe( stusents => { 
    //   console.log(stusents)
    //   this.students = stusents.students
    // })
  }

  levelChange(e) {
    // console.log('-=============>', e)
    this.filterLevel = e;
    // this.studentsSrv.studentsFillterStageAndLevel(this.filterStage, this.filterLevel)
    // .subscribe( stusents => { 
    //   console.log(stusents)
    //   this.students = stusents.students
    // })
  }
  
  onSave(attend: NgForm) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July",    "August",   "September", "October", "November", "December"];
    const date = new Date();
    let attendYear  = date.getFullYear();
    let attendMonth = monthNames[date.getMonth()];
    let attendDay   = date.getDate();

    if (this.selection.selected.length > 0) {
      const newClassAttend = {
        stage: attend.value.stage,
        level: attend.value.level,
        class: attend.value.class,
        students:  this.selection.selected,
        notes:     attend.value.notes,
        month:     attendMonth,
        day:       attendDay,
        type:      "class Attend",
        classId:   this.classInfo._id
      }

      this.AttendesService.addClassAttend(newClassAttend)
      .subscribe(
        msg => {
          attend.resetForm();
          this.AttendesService.getAllClassesAttend();
          this.FlashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
          this.Router.navigate(['/backend/attendes/allAttends'])
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


}
