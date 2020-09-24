import { TeachersService } from './../../../../providers/teachers.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'node_modules/rxjs';
import { PageEvent } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
})
export class AllTeachersComponent implements OnInit {

  teachers;
  oneTeacher;
  teachersSub:  Subscription;
  filtteredPro: any[];
  
  isSpinner = true;
  
  totalData       = 0;
  dataPerPage     = 5;
  currentPageData = 1;
  dataPageSizeOptions = [5, 15, 25, 30];

  educationalStage = ['all Stages', 'preschool', 'elementary', 'middle', 'high'];
  
  stageFillter = 'all Stages';

  constructor( private  teachersSrv: TeachersService,
               private _flashMessagesService: FlashMessagesService) {}

  ngOnInit() {

    this.teachersSrv.getAllTeachers(this.dataPerPage, this.currentPageData, this.stageFillter);
    this.teachersSub = this. teachersSrv.getAllteachersUpdatedListener()
    .subscribe( ( teacherstData: {teachers: any, postCount: number} )=> {
      console.log(' teacherstData =>',  teacherstData)
      this.totalData = teacherstData.postCount;
      this.teachers  = teacherstData.teachers;
      this.isSpinner  = false;

    });
  }

  educationalStageFillter(event) {
    console.log('levelChange =>', event.value);
    this.stageFillter = event.value;
    if (event.value == 'all Stages') {
      this.teachersSrv.getAllTeachers( this.dataPerPage, this.currentPageData,  this.stageFillter);
    } 
    this.teachersSrv.educationalStageFillter(this.dataPerPage, this.currentPageData, this.stageFillter)
    this.teachersSub = this. teachersSrv.getAllteachersUpdatedListener()
    .subscribe( ( teacherstData: {teachers: any, postCount: number} )=> {
      console.log(' teacherstData =>',  teacherstData)
      this.totalData = teacherstData.postCount;
      this.teachers  = teacherstData.teachers;
    });
  }
  
  serchFillter(email: string) {
    console.log(email);
    this.teachersSub = this.teachersSrv.teacherSearchByEmail(email)
    .subscribe( teacher => {
      this.oneTeacher = teacher.teacher;
      if (this.oneTeacher) {
        this.teachers = teacher.teacher
      } else {
        this.teachersSrv.getAllTeachers( this.dataPerPage, this.currentPageData);
      }
    });
  }

 // mat paginator
  onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.currentPageData =  pageData.pageIndex + 1;
    this.dataPerPage =      pageData.pageSize;
    this.teachersSrv.getAllTeachers(this.dataPerPage, this.currentPageData);
  }

  changeProState(proID, event) {
    const prodState = {
      id:          proID.toString(),
      showProduct: event.checked.toString(),
    };
    if (confirm('Are you sure ' +  event.checked + ' ?') ) {
      // this.proService.updateProState(proID, prodState).subscribe(
      //   msg => {
      //     this.proService.getAllProducts(this.dataPerPage, this.currentPageData);
      //     this._flashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
      //   },
      //   err => {
      //     console.log('err.error=>', err.error.message);
      //     this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
      //   });
    }
  }

  onDelete(id: string, name ) {
    if (confirm('Are you sure you want to delete ' + name  + '?') ) {
      this. teachersSrv.deleteTeacher(id)
      .subscribe( msg => {
        this.teachersSrv.getAllTeachers(this.dataPerPage, this.currentPageData);
        this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
      });
   }
  }

  ngOnDestroy() {
    // this.productsSub.unsubscribe();
  }

}
