import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClassesService } from 'src/app/providers/classes.service';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TeachersService } from 'src/app/providers/teachers.service';
import { TextbookService } from 'src/app/providers/textbook.service';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
})
export class TextbookComponent implements OnInit {

  class;
  editMode;
  stages;
  studentsMeg;

  Subscription:  Subscription;


  textbooks;
  classTextbooks = [];
  filteredLevel = [];

  isSpinner = true;

  teachers;
  teacherData;

  stage;
  level;

  totalData       = 0;
  dataPerPage     = 200;
  currentPageData = 1;
  dataPageSizeOptions = [5, 15, 25, 30];
  terms = ['first term', 'second term']  

  reload = true;
 
  constructor(  private TeachersService: TeachersService,
                private ClassesService: ClassesService,
                private TextbookService: TextbookService,
                private route: ActivatedRoute,
                private _flashMessagesService: FlashMessagesService ) { }

  ngOnInit() {


    this.TextbookService.getTextbook();
    this.Subscription = this.TextbookService.getAllTextbooksUpdatedListener()
    .subscribe(
      textbooks => { 
        this.textbooks = textbooks;
        console.log('textbooks =>', textbooks)
        this.isSpinner = false;

       }
    )

    this.ClassesService.getAllStages();
    this.Subscription = this.ClassesService.getAllStagesUpdatedListener()
    .subscribe( ( stages: {stages: any} )=> {
      // console.log(' classes studentstData =>',  stages)
      this.stages  =  stages.stages;
      console.log('this.stages =>', this.stages)
    });

    this.TeachersService.getAllTeachers(this.dataPerPage, this.currentPageData);
    this.Subscription = this. TeachersService.getAllteachersUpdatedListener()
    .subscribe( ( teacherstData: {teachers: any, postCount: number} )=> {
      console.log(' teacherstData =>',  teacherstData)
      this.totalData = teacherstData.postCount;
      this.teachers  = teacherstData.teachers;
    });
  
  }


  stageChange(e) {
    // console.log('-=============>', e)
    this.stage   = e;
    this.classTextbooks = [];
    this.stages.filter( stages => { return stages.stageName === e } )
    .forEach(element => {
      console.log('filteredLevel element =>', element)
      this.filteredLevel = element.leveles;
    });
  }

  levelChange(e) {
    // console.log(e)
    this.classTextbooks = [];
    this.getTeachersByStageAndLevel(this.stage, e)
  }

  getTeachersByStageAndLevel(stage, level) {
    // console.log('stage =>', stage, 'level =>', level)
    this.TeachersService.getTeacherByStage(stage)
    .subscribe(
      teachers => { 
        console.log('stage level teachers =>', teachers) 
        this.teachers = teachers.teachers
      },
      err => { console.log('stage level teachers err =>', err) }
    )
  }

  teacherClick(data) {
    console.log(data.name)
    this.teacherData = data.name.firstname + ' ' + data.name.lastname;
  }

  onSaveSubject(data: NgForm) {
    // console.log('onSaveSubject =>', data)
    let textbookData  = {
      subjectName: data.value.subjectName,
      teatcherId:  data.value.teatcherId,
      teacherName: this.teacherData,
    }
    this.classTextbooks.push(textbookData);
    data.resetForm()
    this.studentsMeg ='';

    // console.log('this.classTextbooks =>', this.classTextbooks)
  }

  removeSubjrc(index) {
    this.classTextbooks.splice(index, 1);
  }

  onSave(textbookData: NgForm) {
    console.log('onSave =>', textbookData.value);

    if (this.classTextbooks.length > 0) {
      const newSubject = {
        stage:     textbookData.value.educationStage,
        level:     textbookData.value.level,
        term:      textbookData.value.term,
        notes:     textbookData.value.notes,
        creator:    '22222',
        created_at:  new Date(),
        textBooks: this.classTextbooks
      }
      console.log('newSubject =>', newSubject)
      this.TextbookService.addTextbook(newSubject)
      .subscribe(
        msg => {
          this.studentsMeg ='';
          this.classTextbooks = [];
          textbookData.resetForm();
          this.ClassesService.getAllStages();
          this.TextbookService.getTextbook();
          this._flashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
        },
        err => {
          console.log('err.error=>', err.error);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        }); 
    } else {
      console.log('length is less than 1 studrnt')
      this.studentsMeg = 'please add textbooks  ';
    }
  }


  OnDestroy() {

    this.Subscription.unsubscribe();
   }


}
