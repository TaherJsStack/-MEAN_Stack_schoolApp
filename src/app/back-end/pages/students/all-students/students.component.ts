import { StudentsService } from './../../../../providers/students.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'node_modules/rxjs';
import { PageEvent } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from 'src/app/providers/settings.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
})
export class AllStudentsComponent implements OnInit {
  
  textDir;
  students;
  paginator = true;
  studentsSub:  Subscription;
  filtteredPro: any[];
  
  isSpinner = true;

  totalData       = 0;
  dataPerPage     = 5;
  currentPageData = 1;
  dataPageSizeOptions = [5, 15, 25, 30, 50, 100];
  
  stageFillter = 'all_Stages';

  educationalStage = ['all_Stages', 'preschool', 'elementary', 'middle', 'high'];

  constructor( private  studentsSrv: StudentsService,
               private SettingsService: SettingsService,
               private _flashMessagesService: FlashMessagesService,
               private translate: TranslateService) { }

  ngOnInit() {

    this.textDir = localStorage.getItem('lang');
    this.translate.use(localStorage.getItem('lang'));

    this.SettingsService.getLangStorage().subscribe(data => {
      this.textDir = localStorage.getItem('lang');
      this.translate.use(localStorage.getItem('lang')); 
    })


    this.studentsSrv.getAllStudents( this.dataPerPage, this.currentPageData, this.stageFillter);
    this.studentsSub = this. studentsSrv.getAllstudentsUpdatedListener()
    .subscribe( ( studentstData: {students: any, postCount: number} )=> {
      console.log(' studentstData =>',  studentstData.students)
      this.totalData =  studentstData.postCount;
      this.students  =  studentstData.students;
      // this.paginator = true;
      this.isSpinner  = false;

    });
  }

  educationalStageFillter(event) {
    this.stageFillter = event.value;
    if (event.value == 'all_Stages') {
      this.stageFillter = '';
      this.studentsSrv.getAllStudents( this.dataPerPage, this.currentPageData, this.stageFillter);
    } 
    this.studentsSrv.educationalStageFillter(event.value, this.dataPerPage, this.currentPageData)
    this.studentsSub = this. studentsSrv.getAllstudentsUpdatedListener()
    .subscribe( ( studentstData: {students: any, postCount: number} )=> {
      console.log(' studentstData =>',  studentstData.students)
      this.totalData =  studentstData.postCount;
      this.students  =  studentstData.students;
      // this.paginator = true;
    });
  }

  searchByEmail(email: string) {
    this.studentsSub = this.studentsSrv.studentSearchByEmail(email)
    .subscribe( student => {
      this.students = student.student;
    });
  }

 // mat paginator
  onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.currentPageData =  pageData.pageIndex + 1;
    this.dataPerPage =      pageData.pageSize;
    this.studentsSrv.getAllStudents(this.dataPerPage, this.currentPageData, this.stageFillter);
  }


  onDelete(id: string, name, parentEmail, parentPhone ) {
    if (confirm('Are you sure you want to delete ' + name  + '?') ) {
      this. studentsSrv.deleteStudent(id, parentEmail, parentPhone)
      .subscribe( msg => {
        this.studentsSrv.getAllStudents(this.dataPerPage, this.currentPageData, this.stageFillter);
        this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
      });
   }
  }

  ngOnDestroy() {

  }

}
