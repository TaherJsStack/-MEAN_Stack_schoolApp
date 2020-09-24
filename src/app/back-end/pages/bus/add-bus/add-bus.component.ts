import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/providers/students.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PageEvent } from '@angular/material';
import { NgForm } from '@angular/forms';
import { PaymentsService } from 'src/app/providers/payments.service';
import { BusService } from 'src/app/providers/bus.service';
import { Router } from '@angular/router';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  image: string;
  phone: number;
  city: string;
  street: string;
  stage: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  // styleUrls: ['./add-bus.component.scss']
})
export class AddBusComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[];

  displayedColumns: string[] = ['select', 'position', 'name', 'image', 'phone', 'city', 'street', 'stage'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  selection = new SelectionModel(true, []);

  cites = ["Cairo", "Giza", "Haram", "Ma'adi", "Mohandeseen", "Nasr City", "Heliopolis", "Downtown", "6 October", "Qatamia"];

  class; // to remove error must change 
  editMode;

  students;
  studentsMeg;
  busStudents = [];
  Subscription:  Subscription;

  totalData       = 0;
  dataPerPage     = 15;
  currentPageData = 1;
  dataPageSizeOptions = [15, 30, 45, 60];
  reload = true;

  constructor(  private Router: Router,
                private studentsSrv: StudentsService,
                private BusService: BusService,
                private paymentsSrv: PaymentsService,
                private _flashMessagesService: FlashMessagesService ) { }

  ngOnInit() {

    this.studentsSrv.getStudentsPayBus(this.dataPerPage, this.currentPageData);
    this.Subscription = this.studentsSrv.getStudentsPayBusUpdatedListener()
    .subscribe( ( students: {students: any, postCount: number} )=> {
        this.totalData =  students.postCount;
        this.students  =  students.students;
        this.dataSource = new MatTableDataSource(students.students);

      });
  }

  // studentCheck(id, name) {
  //   const student = {id: id, name: name}
  //   let isStudent = this.busStudents.findIndex(s => { return s.id == id})    
  //   if (isStudent !== -1) {
  //     this.busStudents.splice(isStudent, 1);
  //   } else {
  //     this.busStudents.push(student);  
  //   }
  // }

   // mat paginator
   onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.currentPageData =  pageData.pageIndex + 1;
    this.dataPerPage =      pageData.pageSize;
    this.studentsSrv.getStudentsPayBus(this.dataPerPage, this.currentPageData);
  }

  onSave(busData: NgForm) {
    // console.log('onSave =>', busData.value);
    // console.log(' busStudents length =>', this.selection.selected.length);
    if (this.selection.selected.length > 0) {
      const newBus = {
        area:        busData.value.area,
        city:        busData.value.city,
        busNo:       busData.value.busNo,
        drivar:      busData.value.drivar,
        supervisor:  busData.value.supervisor,
        students:    this.selection.selected,
        created_at:  new Date(),
        creator:     '22222',
      }
      console.log('addLine(newBus) =>', newBus)
      this.BusService.addLine(newBus)
      .subscribe(
        msg => {
          this.studentsMeg ='';
          this.busStudents = [];
          this.BusService.getAllLines();
          busData.reset();
          this.Router.navigate(['/backend/bus/allLines']);
          this._flashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
        },
        err => {
          console.log('err.error=>', err.error);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        }); 
    } else {
      console.log('length is less than 1 studrnt')
      this.studentsMeg = 'no students to add you must to select some of students';
    }
    busData.resetForm();
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
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  
  OnDestroy() { 
    this.Subscription.unsubscribe();
  }


}







