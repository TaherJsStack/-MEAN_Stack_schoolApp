import { TeachersService } from './../../../../providers/teachers.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'node_modules/rxjs';
import { ActivatedRoute, ParamMap, Router } from 'node_modules/@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as data from '../../../../countriesData';
import { mimeType } from '../../../../mime-type.validator';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
})
export class AddTeacherComponent implements OnInit {

  allCountries: any;
  activeAccount = true;
  date;
  checked:  Boolean = true;
  editMode: Boolean = false;
  editTeacher;
  teacherID;
  imgReview: string;
  imageFile;
  teacherForm: FormGroup;
  reload = true;
  preschool  = false;
  elementary = false;
  middle     = false;
  high       = false;

  subjects = [ 'Mathematics', 'Science', 'Handwriting', 
              'Physical Education (P.E.)', 
              'Art',   'Music',
              'Dance', 'Sports',
              'Remedial', 'Math',
              'Fundamental', 'Basic Math',
              'Mathematics',
              'Pre-Algebra',
              'Geometry',
              'Trigonometry',
              'Precalculus',
              'Calculus,',
              'Statistics',
              'Business Math',
              'Consumer Math',
              'Accounting'
            ];

   
  constructor(
              private Router: Router,
              private teacherSrv: TeachersService,
              private route: ActivatedRoute,
              private _flashMessagesService: FlashMessagesService) {  }

  ngOnInit() {

    this.allCountries = data.default;


       // Some Damn Comments here
       this.teacherForm = new FormGroup ({
        zip:      new FormControl(null, Validators.required),
        city:     new FormControl(null, Validators.required),
        notes:    new FormControl(null, Validators.required),
        email:    new FormControl(null, Validators.required),
        phone:    new FormControl(null, Validators.required),
        ginder:   new FormControl(null, Validators.required),
        street:   new FormControl(null, Validators.required),
        f_name:   new FormControl(null, Validators.required),
        l_name:   new FormControl(null, Validators.required),
        salary:   new FormControl(null, Validators.required),
        subject:  new FormControl(null, Validators.required),
        JobType:   new FormControl(null, Validators.required),
        country:   new FormControl(null, Validators.required),
        birthdate: new FormControl(null, Validators.required),
        activeAccount:     new FormControl(this.activeAccount),
        // educationalStage:  new FormControl(null, Validators.required),
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
          this.teacherID     = paramMap.get('id');
          this.editTeacher   = this.teacherSrv.getTeacher(this.teacherID);
          this.date          = this.editTeacher.birthdate;
          this.imgReview     = this.editTeacher.imageUrl;
          this.activeAccount = this.editTeacher.activeAccount;

          this.preschool  = this.editTeacher.educationalStage.preschool;
          this.elementary = this.editTeacher.educationalStage.elementary;
          this.middle     = this.editTeacher.educationalStage.middle;
          this.high       = this.editTeacher.educationalStage.high;

          this.teacherForm.patchValue({image: this.imgReview});

        } else {
          this.editMode  = false;
          this.teacherID = null;
        }
      });
    
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.teacherForm.patchValue({image: file});
    this.teacherForm.get('image').updateValueAndValidity();
    // console.log(file);
    // console.log(this.teacherForm);
    // to create prview
    const reader = new FileReader();
    reader.onload = () => {
      this.imgReview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSave() {
    if (this.teacherForm.invalid ) {
      return;
    }
      const parentData = new FormData();
        parentData.append('firstname',       this.teacherForm.value.f_name);
        parentData.append('lastname',        this.teacherForm.value.l_name);
        parentData.append('country',         this.teacherForm.value.country);
        parentData.append('street',          this.teacherForm.value.street);
        parentData.append('zip',             this.teacherForm.value.zip);
        parentData.append('city',            this.teacherForm.value.city);
        parentData.append('email',           this.teacherForm.value.email);
        parentData.append('phone',           this.teacherForm.value.phone);
        parentData.append('ginder',          this.teacherForm.value.ginder);
        parentData.append('notes',           this.teacherForm.value.notes);
        parentData.append('JobType',         this.teacherForm.value.JobType);
        parentData.append('creatorId',       "creatorId");
        parentData.append('workHours',       "30");
        parentData.append('salary',          this.teacherForm.value.salary);
        parentData.append('subject',         this.teacherForm.value.subject);
        parentData.append('activeAccount',   "false" );
        parentData.append('birthdate',       this.teacherForm.value.birthdate);
        parentData.append('imageUrl',        this.teacherForm.value.image);
        parentData.append('preschool',       this.preschool.toString());
        parentData.append('elementary',      this.elementary.toString());
        parentData.append('middle',          this.middle.toString());
        parentData.append('high',            this.high.toString());
        
    if (this.editMode) {
      this.teacherSrv.updateTeacher(this.teacherID, parentData)
      .subscribe(
        msg => {
          this.editMode = false;
          this.imgReview = null;
          this.Router.navigate(['/backend/teachers/allTeachers']);
          this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
        },
        err => {
          console.log('err.error=>', err.error.message);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
    } else {
      this.teacherSrv.addTeacher(parentData)
        .subscribe(
          msg => {
            this.editMode = false;
            this.imgReview = null;
            this.Router.navigate(['/backend/teachers/allTeachers']);
            this._flashMessagesService.show( msg.message  ,{ cssClass: 'alert-success flash-message', timeout: 4000 });
          },
          err => {
            this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
          });
    }

  }

  ngOnDestroy() {}


}
