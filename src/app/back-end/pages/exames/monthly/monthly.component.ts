import { TextbookService } from 'src/app/providers/textbook.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { TeachersService } from 'src/app/providers/teachers.service';
import { ClassesService } from 'src/app/providers/classes.service';
import { ExamesService } from 'src/app/providers/exames.service';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
})
export class MonthlyComponent implements OnInit {

  stage;
  level;

  class; // to remove error must change 
  editMode;

  stages;
  studentsMeg;

  Subscription:  Subscription;

  classesData   = [];
  classData     = [];
  classTextbooks = [];
  classStudents = [];
  filteredLevel;
  studentsDegree = [];

  teachers;
  teacherData;
  totalData       = 0;
  dataPerPage     = 5;
  currentPageData = 1;
  dataPageSizeOptions = [5, 15, 25, 30];
  terms = ['first term', 'second term']  
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July",    "August",   "September", "October", "November", "December"];
  reload = true;
 
  constructor(  private TeachersService: TeachersService,
                private ClassesService: ClassesService,
                private TextbookService: TextbookService,
                private ExamesService: ExamesService,
                private route: ActivatedRoute,
                private _flashMessagesService: FlashMessagesService ) { }

  ngOnInit() {

    this.ClassesService.getAllStages();
    this.Subscription = this.ClassesService.getAllStagesUpdatedListener()
    .subscribe( ( stages: {stages: any} )=> {
      // console.log(' classes studentstData =>',  stages)
      this.stages  =  stages.stages;
      console.log('this.stages =>', this.stages)
    });

    this.TeachersService.getAllTeachers( this.dataPerPage, this.currentPageData);
    this.Subscription = this. TeachersService.getAllteachersUpdatedListener()
    .subscribe( ( teacherstData: {teachers: any, postCount: number} )=> {
      console.log(' teacherstData =>',  teacherstData)
      this.totalData = teacherstData.postCount;
      this.teachers  = teacherstData.teachers;
    });
  }


  stageChange(e) {
    console.log('stageChange -=============>', e)
    this.stage   = e;
    this.classTextbooks = [];
    this.classStudents = [];
    this.stages.filter( stages => { return stages.stageName === e } )
    .forEach(element => {
      this.filteredLevel = element.leveles;  
    });
  }

  levelChange(e) {
    console.log('levelChange-=============>', e)
    this.level = e;
    this.classTextbooks = [];
    this.classStudents = [];
  }

  // get Level Classes
  levelClick(id) {
    this.ClassesService.getLevelClasses(id);
    this.Subscription = this.ClassesService.getLevelClassesUpdatedListener()
    .subscribe( ( classes: {classes: any} )=> {
      this.classesData = classes.classes;
    });
  }
  
  // get class student on select class
  classClick(id) {
    this.Subscription = this.ClassesService.getClass(id)
    .subscribe( data => {
      this.classData = data.class.subjects;
      this.classStudents = data.class.students;
    })
  }

  onTermClick(term) {
    console.log('onTermClick =>', term)
    this.TextbookService.getClassTextbooks(this.stage, this.level, term)
    .subscribe(
      textbooks => {
        console.log('textbooks =>', textbooks.textBooks.termTextbooks)
        this.classTextbooks = textbooks.textBooks.termTextbooks
      }
    )
  }


  onSaveDegree(index, name, id, value) {
    console.log('onSaveDegree =>', name, id, value)
    let studentDegree = { id: id, name: name, degree: value }
    if (value == '') {
      return
    } else {
      let isStudent = this.studentsDegree.findIndex(s => { return s.id == id})
      // console.log('isStudent => ', isStudent)
      if (isStudent !== -1) {
        this.studentsDegree.splice(isStudent, 1);
      }
      this.studentsDegree.push(studentDegree)
    }
    // console.log('this.studentsDegree =>', this.studentsDegree)
  }

  onSave(subjectData: NgForm) {
    console.log('onSave =>', subjectData.value);

    if (this.studentsDegree.length > 0) {
      const newDegree = {
        stage:     subjectData.value.educationStage,
        level:     subjectData.value.level,
        class:     subjectData.value.class,
        term:      subjectData.value.term,
        textbook:  subjectData.value.textbook,
        notes:     subjectData.value.notes,
        month:     subjectData.value.month,
        type:           'monthly',
        studentsDegree: this.studentsDegree
      }
      console.log('newDegree =>', newDegree)
      this.ExamesService.addExame(newDegree)
      .subscribe(
        msg => {
          this.studentsMeg ='';
          this.classStudents = [];
          this.studentsDegree = [];
          subjectData.resetForm();
          this.ClassesService.getAllStages();
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
    this.Subscription.unsubscribe()
  }


}
