import { ParentsService } from '../../../../providers/parents.service';
import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Subscription } from 'node_modules/rxjs';
import { ActivatedRoute, ParamMap, Router } from 'node_modules/@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as data from '../../../../countriesData';
import { mimeType } from './../../../../mime-type.validator';
import { ParentModel } from 'src/app/models/parent';
import { SettingsService } from 'src/app/providers/settings.service';
import { TranslateService, LangChangeEvent, DefaultLangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  // styleUrls: ['./add.component.scss']
})
export class AddParentComponent implements OnInit {
  // @Input() parentForm: FormGroup;

  Subscription: Subscription;
  allCountries: any;
  activeAccount = true;
  date;
  checked:  Boolean = true;
  editMode: Boolean = false;
  editParent: ParentModel;
  add;
  Update;
  ParentID;
  imgReview: string;
  imageFile;
  parentForm: FormGroup;
  reload = true;

  selectedOption = '1';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ParentsSrv: ParentsService,
              private translate: TranslateService,
              private SettingsService: SettingsService,
              private _flashMessagesService: FlashMessagesService) {
                this.translate.get(['pages.add', 'pages.Update'])
                .subscribe(translations => {
                  // console.log('translate.get =>', translations)
                  this.add = translations['pages.add'];
                  this.Update = translations['pages.Update'];
                });

                translate.onLangChange.subscribe((event: LangChangeEvent) => {
                  // do something
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
       this.parentForm = new FormGroup ({
        zip:       new FormControl(null, Validators.required),
        job:       new FormControl(null, Validators.required),
        city:      new FormControl(null, Validators.required),
        notes:     new FormControl(null, Validators.required),
        ginder:    new FormControl(null, Validators.required),
        street:    new FormControl(null, Validators.required),
        l_name:    new FormControl(null, Validators.required),
        childes:   new FormControl(),
        country:   new FormControl(null, Validators.required),
        birthdate: new FormControl(null, Validators.required),
        activeAccount: new FormControl(this.activeAccount),
        email:     new FormControl(null, Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          ])
        ),
        phone:     new FormControl(null,  {validators: [
          Validators.maxLength(11),
          Validators.minLength(11),
          Validators.required]}
        ),        
        f_name:    new FormControl(null,
          {validators: [
            Validators.maxLength(15),
            Validators.minLength(3),
            Validators.required]} 
          ),
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
          this.ParentID      = paramMap.get('id');
          this.editParent    = this.ParentsSrv.getParent(this.ParentID);
          this.date          = this.editParent.birthdate;
          this.imgReview     = this.editParent.imageUrl;
      
          this.parentForm.patchValue({image: this.imgReview });
          this.parentForm.patchValue({childes: this.editParent.childes });

          this.activeAccount = this.editParent.activeAccount;
          this.translate.onDefaultLangChange.subscribe((event: DefaultLangChangeEvent) => {
            this.add    = event.translations.pages.add
            this.Update = event.translations.pages.Update
          });
        } else {
          this.editMode = false;
          this.ParentID = null;
        }
      });

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log('const file', file)
    this.parentForm.patchValue({image: file});
    this.parentForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imgReview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // show active Account or not
  changedStatus(event) {
    this.activeAccount = event.checked;
  }

  onSaveParent() {
    if (this.parentForm.invalid ) {
      return;
    }
      const parentData = new FormData();
      parentData.append('job',         this.parentForm.value.job);
      parentData.append('zip',         this.parentForm.value.zip);
      parentData.append('city',        this.parentForm.value.city);
      parentData.append('notes',       this.parentForm.value.notes);
      parentData.append('email',       this.parentForm.value.email);
      parentData.append('phone',       this.parentForm.value.phone);
      parentData.append('street',      this.parentForm.value.street);
      parentData.append('ginder',      this.parentForm.value.ginder);
      parentData.append('childes',     JSON.stringify(this.parentForm.value.childes));
      parentData.append('country',     this.parentForm.value.country);
      parentData.append('lastname',    this.parentForm.value.l_name);
      parentData.append('firstname',   this.parentForm.value.f_name);
      parentData.append('activeAccount',   this.activeAccount.toString() );
      parentData.append('birthdate',       this.parentForm.value.birthdate);
      parentData.append('roll', 'parent');
      parentData.append('image',       this.parentForm.value.image );

    parentData.forEach( (a,d) => {
      console.log(d, ' => : ', a)
    })
    console.log('parentData update ====>')
    if (this.editMode) {
      console.log('parentData update ====>')
      console.log('parentData update ====>', parentData)
      this.ParentsSrv.updateParent(this.ParentID, parentData)
      .subscribe(
        msg => {
          this.router.navigate(['/backend/parents/allParents']);
          this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
        },
        err => {
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
    } else {
      this.ParentsSrv.addParent(parentData)
        .subscribe(
          msg => {
            this.router.navigate(['/backend/parents/allParents']);
            this._flashMessagesService.show( msg.message  ,{ cssClass: 'alert-success flash-message', timeout: 4000 });
          },
          err => {
            console.log('err.error 2 =>', err.error.message);
            this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
          });
    }
    // this.editMode = false;
    // // this.parentForm.reset();
    // this.imgReview = null;
  }

  ngOnDestroy() {
    // this.Subscription.unsubscribe()
  }


}
