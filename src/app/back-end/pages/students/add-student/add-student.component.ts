import { StudentsService } from './../../../../providers/students.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'node_modules/rxjs';
import { ActivatedRoute, ParamMap, Router } from 'node_modules/@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as data from '../../../../countriesData';
import { mimeType } from '../../../../mime-type.validator';
import { ParentModel } from 'src/app/models/parent';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SettingsService } from 'src/app/providers/settings.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
})
export class AddStudentComponent implements OnInit,OnDestroy {

  allCountries: any;
  date;
  checked:  Boolean = true;
  editMode: Boolean = false;
  editStudent;
  add;
  Update;
  studentID;
  imgReview: string;
  imageFile;
  studentForm: FormGroup;

  educationalStage = ['preschool', 'elementary', 'middle', 'high'];
  levels  = ['level 1', 'level 2', 'level 3', 'level 4', 'level 5', 'level 6'];

  constructor(private Router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private StudentsSrv: StudentsService,
              private SettingsService: SettingsService,
              private _flashMessagesService: FlashMessagesService) { 
                this.translate.get(['pages.add', 'pages.Update'])
                .subscribe(translations => {
                  this.add = translations['pages.add'];
                  this.Update = translations['pages.Update'];
                });

                translate.onLangChange.subscribe((event: LangChangeEvent) => {
                  console.log('event: LangChangeEvent =>', event)
                  this.add    = event.translations.pages.add
                  this.Update = event.translations.pages.Update
                });
               }

  ngOnInit() {

        this.allCountries = data.default;

        this.translate.use(localStorage.getItem('lang')); 
        this.SettingsService.getLangStorage().subscribe(data => {
          this.translate.use(localStorage.getItem('lang')); 
          console.log('getLangStorage =>', data)
        })

       // Some Damn Comments here
       this.studentForm = new FormGroup ({
        zip:       new FormControl(null, Validators.required),
        city:      new FormControl(null, Validators.required),
        notes:     new FormControl(null, Validators.required),
        ginder:    new FormControl(null, Validators.required),
        street:    new FormControl(null, Validators.required),
        f_name:    new FormControl(null, Validators.required),
        l_name:    new FormControl(null, Validators.required),
        country:   new FormControl(null, Validators.required),
        birthdate: new FormControl(null, Validators.required),
        email:     new FormControl(null, [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
        // parentEmail: new FormControl(null, [
        //   Validators.required,
        //   Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
        parentEmail: new FormControl(null,  Validators.required ),
        phone:     new FormControl(null, {validators: [
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.required,]}),
        parentPhone: new FormControl(null, {validators: [
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.required,]}),
        educationalStage: new FormControl(null, Validators.required),
        level: new FormControl(null, Validators.required),
        // activeAccount:  new FormControl(this.activeAccount),
        // image:      new FormControl(null,
        //   {validators: [
        //     Validators.required],
        //     asyncValidators: [mimeType]}),
        image:      new FormControl(),
      });
      

    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
      if ( paramMap.has('id') ) {
          this.editMode      = true;
          this.studentID      = paramMap.get('id');
          this.editStudent    = this.StudentsSrv.getStudent(this.studentID);
          this.date          = this.editStudent.birthdate;
          this.imgReview     = this.editStudent.imageUrl;
      
          this.studentForm.patchValue({image: this.imgReview });

          // this.activeAccount = this.editStudent.activeAccount;
        } else {
          this.editMode = false;
          this.studentID = null;
        }
      });
    
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
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.studentForm.patchValue({image: file});
    this.studentForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imgReview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSave() {
    if (this.studentForm.invalid ) {
      return;
    }
      const parentData = new FormData();
        parentData.append('firstname',       this.studentForm.value.f_name);
        parentData.append('lastname',        this.studentForm.value.l_name);
        parentData.append('country',         this.studentForm.value.country);
        parentData.append('street',          this.studentForm.value.street);
        parentData.append('zip',             this.studentForm.value.zip);
        parentData.append('city',            this.studentForm.value.city);
        parentData.append('email',           this.studentForm.value.email);
        parentData.append('phone',           this.studentForm.value.phone);
        parentData.append('ginder',          this.studentForm.value.ginder);
        parentData.append('notes',           this.studentForm.value.notes);
        parentData.append('parentEmail',     this.studentForm.value.parentEmail);
        parentData.append('parentPhone',     this.studentForm.value.parentPhone);
        parentData.append('level',           this.studentForm.value.level);
        parentData.append('educationalStage',this.studentForm.value.educationalStage);
        parentData.append('birthdate',       this.studentForm.value.birthdate);
        parentData.append('imageUrl',        this.studentForm.value.image);

    if (this.editMode) {
      this.StudentsSrv.updateStudent(this.studentID, parentData)
      .subscribe(
        msg => {
          this.Router.navigate(['/backend/students/allStudents']);
          this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
          this.editMode = false;
          this.imgReview = null;
        },
        err => {
          console.log('err.error=>', err.error.message);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
    } else {
      this.StudentsSrv.addStudent(parentData)
        .subscribe(
          msg => {
            this.Router.navigate(['/backend/students/allStudents']);
            this._flashMessagesService.show( msg.message  ,{ cssClass: 'alert-success flash-message', timeout: 4000 });
            this.editMode = false;
            this.imgReview = null;
          },
          err => {
            this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
          });
    }

  }

  ngOnDestroy() {}

}
