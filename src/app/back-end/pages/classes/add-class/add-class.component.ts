import { ClassesService } from './../../../../providers/classes.service';
import { ActivatedRoute, Params, ParamMap, Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { PageEvent } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import { StudentsService } from 'src/app/providers/students.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  // styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {

  editMode;
  
  class;
  stages;
  students;
  studentsMeg;
  classStudents = [];
  studentsSub:  Subscription;

  filterStage;
  filterLevel = 'level 1';

  totalData       = 0;
  dataPerPage     = 15;
  currentPageData = 1;
  dataPageSizeOptions = [15, 30, 45, 60];
  reload = true;
  educationalStage = ['preschool', 'elementary', 'middle', 'high'];
  levels  = ['level 1', 'level 2', 'level 3', 'level 4', 'level 5', 'level 6'];
  
  constructor(  private Router: Router,
                private classesSrv: ClassesService,
                private studentsSrv: StudentsService,
                private route: ActivatedRoute,
                private _flashMessagesService: FlashMessagesService ) { }

  ngOnInit() {

    this.studentsSrv.getAllStudents( this.dataPerPage, this.currentPageData);
    this.studentsSub = this. studentsSrv.getAllstudentsUpdatedListener()
    .subscribe( ( studentstData: {students: any, postCount: number} )=> {
      // console.log(' studentstData =>',  studentstData.students)
      this.totalData =  studentstData.postCount;
      this.students  =  studentstData.students;
      // this.paginator = true;
    });

    this.classesSrv.getAllStages();
    this.studentsSub = this. classesSrv.getAllStagesUpdatedListener()
    .subscribe( ( stages: {stages: any} )=> {
      console.log(' classes studentstData =>',  stages)
      // this.totalData =  classes.postCount;
      this.stages  =  stages.stages;
    });
  
  }

  CheckAllOptions() {
    // if (this.checkboxes.every(val => val.checked == true))
    //   this.checkboxes.forEach(val => { val.checked = false });
    // else
    //   this.checkboxes.forEach(val => { val.checked = true });
  }

  tabChanged(e) {
    console.log('afterViewInit =>', e.tab.textLabel);
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
    this.classStudents = [];
    this.studentsSrv.studentsFillterStageAndLevel(this.filterStage, this.filterLevel)
    .subscribe( stusents => { 
      console.log(stusents)
      this.students = stusents.students
    })
  }

  levelChange(e) {
    console.log('-=============>', e)
    this.filterLevel = e;
    this.classStudents = [];
    this.studentsSrv.studentsFillterStageAndLevel(this.filterStage, this.filterLevel)
    .subscribe( stusents => { 
      console.log(stusents)
      this.students = stusents.students
    })
  }

  studentCheck(id, f_name, l_name) {
    const student = {id: id, name: f_name + ' ' + l_name}
    let isStudent = this.classStudents.findIndex(s => { return s.id == id})    
    if (isStudent !== -1) {
      this.classStudents.splice(isStudent, 1);
    } else {
      this.classStudents.push(student);  
    }
  }

   // mat paginator
   onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.currentPageData =  pageData.pageIndex + 1;
    this.dataPerPage =      pageData.pageSize;
    this.studentsSrv.getAllStudents(this.dataPerPage, this.currentPageData);
  }

  onSave(classData: NgForm) {
    if (this.classStudents.length > 0) {
      const newClass = {
        name:           classData.value.name,
        level:          classData.value.level,
        students:       this.classStudents,
        educationStage: classData.value.educationStage,
        created_at:     new Date(),
        creator:        '22222',
      }
      this.classesSrv.addClass(newClass)
      .subscribe(
        msg => {
          this.studentsMeg ='';
          this.classStudents = [];
          this.studentsSrv.getAllStudents( this.dataPerPage, this.currentPageData);
          this.classesSrv.getAllStages();
          classData.resetForm();

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

  }

  OnDestroy() {
    
  }


}
