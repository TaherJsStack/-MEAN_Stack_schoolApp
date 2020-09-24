import { PaymentsService } from './../../../../providers/payments.service';
import { ParentsService } from '../../../../providers/parents.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'node_modules/rxjs';
import { ActivatedRoute, ParamMap } from 'node_modules/@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import { StudentsService } from 'src/app/providers/students.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
})
export class AddPaymentComponent implements OnInit {

  student;
  payments;
  studentPayment;
  editMode = false;
  isPayForm = false; 
  payForm: FormGroup;

  isBassChecked;
  isBooksChecked;
  isSchoolChecked;
  isClothesChecked;

  bassValue    = 0;
  booksValue   = 0;
  schoolValue  = 0;
  clothesValue = 0;
  reload = true;
  
  totalData       = 0;
  dataPerPage     = 5;
  currentPageData = 1;
  dataPageSizeOptions = [5, 15, 25, 30];

  paymentSub: Subscription;


  constructor(
              private studentsSrv: StudentsService,
              private paymentsSrv: PaymentsService,
              private route: ActivatedRoute,
              private _flashMessagesService: FlashMessagesService) {  }

  ngOnInit() {

    this.paymentsSrv.getAllPayments( this.dataPerPage, this.currentPageData);
    this.paymentSub = this.paymentsSrv.getAllPaymentsUpdatedListener()
    .subscribe( ( payments: {payments: any, postCount: number} )=> {
      this.totalData     = payments.postCount;
      // this.filtteredPro  = studentstData.students;
      this.payments   = payments.payments;
    });

    console.log('paymentSub =>', this.payments)

  }

  // mat paginator
  onChangedPage(pageData: PageEvent) {
    this.currentPageData =  pageData.pageIndex + 1;
    this.dataPerPage =      pageData.pageSize;
    this.paymentsSrv.getAllPayments(this.dataPerPage, this.currentPageData)
  }

  serchFillter(query: string) {
    if (query.length == 4 || query.length > 4) {
      this.studentsSrv.studentSearch(query)
      .subscribe(
        msg => {
          this.bassValue    = 0;
          this.booksValue   = 0;
          this.schoolValue  = 0;
          this.clothesValue = 0;

          this.student = msg.student;
          // this.paymentsSrv.paySearch(this.student._id)
          //   .subscribe( studentPayment => {
          //     // console.log('this paymentsSrv getPay =>', studentPayment)
          //     this.studentPayment = studentPayment;
          //   });
          this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
        },
        err => {
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });      
    } else {
      this.isPayForm = false;
      this.student   = null;
    }
  }

  onPay(studentId) {
    this.isPayForm = true;
    this.paymentsSrv.paySearch(studentId)
      .subscribe( studentPayment => {
        this.studentPayment = studentPayment.student;
        if(studentPayment.student) {
          this.isPayForm = true;
          this.bassValue = this.studentPayment.bass;
          this.booksValue = this.studentPayment.books;
          this.schoolValue = this.studentPayment.school;
          this.clothesValue = this.studentPayment.clothes
        }
      });
  }

  // onCheckboxChagen(event, value) {

  //   if (value == 'elementary') {
  //     this.educationalStage.elementary = event.checked;
  //   } 
  //   if (value == 'preschool') {
  //     this.educationalStage.preschool = event.checked;
  //   } 
  //   if (value == 'middle') {
  //     this.educationalStage.middle = event.checked;
  //   } 
  //   if (value == 'high') {
  //     this.educationalStage.high = event.checked;
  //   } 
  // }


  onSchoolChange(evant) {
    if ( evant.checked ) {
      this.schoolValue = 800 
    } else {
      this.schoolValue = 0
    }
  }

  onBooksChange(evant) {
    if ( evant.checked ) {
      this.booksValue = 90
    } else {
      this.booksValue = 0
    }
  }
  
  onClothesChange(evant) {
    console.log('(change)', evant.checked)
    if ( evant.checked ) {
      this.clothesValue = 99
    } else {
      this.clothesValue = 0
    }
  }

  onBassChange(evant) {
    console.log('(change)', evant.checked)
    if ( evant.checked ) {
      this.bassValue = 300
    } else {
      this.bassValue = 0
    }
  }
  
  refresh() {
    this.reload=false;
    setTimeout(x=>this.reload=true, 0);
    this.ngOnInit()
  }

  onSave() {
    const payData = {
      bass:         this.bassValue,
      books:        this.booksValue,
      school:       this.schoolValue,
      clothes:      this.clothesValue,
      student:      this.student,
      student_id:   this.student._id,
      studentName:  this.student.name.firstname + ' ' + this.student.name.lastname,
      studentStage: this.student.educationalStage,
      creator_id:   '222',
      added_at:     new Date(),
    }
    if (this.studentPayment) {
      this.paymentsSrv.updatePay(this.studentPayment._id, payData)
      .subscribe(
        msg => {
          this.isPayForm = false;
          this.student   = null;
          this.studentPayment = [];
          this.bassValue    = 0;
          this.booksValue   = 0;
          this.schoolValue  = 0;
          this.clothesValue = 0;   
          this.paymentsSrv.getAllPayments( this.dataPerPage, this.currentPageData);
          this._flashMessagesService.show( msg.message  ,{ cssClass: 'alert-success flash-message', timeout: 4000 });
        },
        err => {
          console.log('err.error=>', err.error.message);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
    } else {
      this.paymentsSrv.addPay(payData)
      .subscribe(
        msg => {
          this.isPayForm = false;
          this.student   = null;
          this.paymentsSrv.getAllPayments( this.dataPerPage, this.currentPageData);
          this._flashMessagesService.show( msg.message  ,{ cssClass: 'alert-success flash-message', timeout: 4000 });
        },
        err => {
          console.log('err.error=>', err.error.message);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });  
    }

  }

  ngOnDestroy() {

  }

}
