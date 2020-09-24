import { EmployeesService } from './../../../../providers/employees.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'node_modules/rxjs';
import { ActivatedRoute, ParamMap, Router } from 'node_modules/@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as data from '../../../../countriesData';
import { mimeType } from '../../../../mime-type.validator';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  // styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  allCountries: any;
  activeAccount = true;
  date;
  checked:  Boolean = true;
  editMode: Boolean = false;
  editEmployee;
  employeeID;
  imgReview: string;
  imageFile;
  employeeForm: FormGroup;
  dataPerPage = 5;
  currentPage = 1;
  reload = true;

  employeeWorkType = [
    { name: 'Administrative'},
    { name: 'accountant'},
    { name: 'driver'},
    { name: 'worker'},
    { name: 'baby sitter'},
  ]

  constructor(private Router: Router,
              private employeeSrv: EmployeesService,
              private route: ActivatedRoute,
              private _flashMessagesService: FlashMessagesService) {  }

  ngOnInit() {

    this.allCountries = data.default;

       // Some Damn Comments here
       this.employeeForm = new FormGroup ({
        city:      new FormControl(null, Validators.required),
        notes:     new FormControl(null, Validators.required),
        // email:     new FormControl(null, Validators.required),
        // phone:     new FormControl(null, Validators.required),
        ginder:    new FormControl(null, Validators.required),
        street:    new FormControl(null, Validators.required),
        f_name:    new FormControl(null, Validators.required),
        l_name:    new FormControl(null, Validators.required),
        country:   new FormControl(null, Validators.required),
        salary:    new FormControl(null, Validators.required),
        work:      new FormControl(null, Validators.required),
        birthdate: new FormControl(null, Validators.required),
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
        // activeAccount: new FormControl(this.activeAccount),
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
          this.employeeID      = paramMap.get('id');
          this.editEmployee    = this.employeeSrv.getEmployee(this.employeeID);
          this.date          = this.editEmployee.birthdate;
          this.imgReview     = this.editEmployee.imageUrl;
          // this.activeAccount = this.editEmployee.activeAccount;
          this.employeeForm.patchValue({image: this.imgReview});

        } else {
          this.editMode  = false;
          this.employeeID = null;
        }
      });
    
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.employeeForm.patchValue({image: file});
    this.employeeForm.get('image').updateValueAndValidity();
    // console.log(file);
    // console.log(this.employeeForm);
    // to create prview
    const reader = new FileReader();
    reader.onload = () => {
      this.imgReview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // // show active Account or not
  // changedStatus(event) {
  //   console.log('event.checked =>', event.checked);
  //   this.activeAccount = event.checked;
  // }
  
  refresh() {
    this.reload=false;
    setTimeout(x=>this.reload=true, 0);
    this.ngOnInit()
  }

  onSave() {
    if (this.employeeForm.invalid ) {
      return;
    }
      const employeeData = new FormData();
        employeeData.append('firstname',       this.employeeForm.value.f_name);
        employeeData.append('lastname',        this.employeeForm.value.l_name);
        employeeData.append('country',         this.employeeForm.value.country);
        employeeData.append('street',          this.employeeForm.value.street);
        employeeData.append('city',            this.employeeForm.value.city);
        employeeData.append('email',           this.employeeForm.value.email);
        employeeData.append('phone',           this.employeeForm.value.phone);
        employeeData.append('ginder',          this.employeeForm.value.ginder);
        employeeData.append('notes',           this.employeeForm.value.notes);
        employeeData.append('creatorId',       "creatorId");
        employeeData.append('workHours',       "30");
        employeeData.append('salary',         this.employeeForm.value.salary);
        employeeData.append('work',           this.employeeForm.value.work);
        employeeData.append('roll',           this.employeeForm.value.work);
        employeeData.append('activeAccount',   'false');
        employeeData.append('birthdate',       this.employeeForm.value.birthdate);
        employeeData.append('created_at',      new Date().toISOString());
        employeeData.append('imageUrl',        this.employeeForm.value.image);

    if (this.editMode) {
      this.employeeSrv.updateEmployee(this.employeeID, employeeData)
      .subscribe(
        msg => {
          this.editMode = false;
          this.imgReview = null;
          this.Router.navigate(['/backend/employees/allEmployees']);
          this.employeeSrv.getAllEmployees(this.dataPerPage, this.currentPage);
          this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
        },
        err => {
          console.log('err.error=>', err.error.message);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
    } else {
      this.employeeSrv.addEmployee(employeeData)
        .subscribe(
          msg => {
            this.editMode = false;
            this.imgReview = null;
            this.Router.navigate(['/backend/employees/allEmployees']);
            this.employeeSrv.getAllEmployees(this.dataPerPage, this.currentPage);
            this._flashMessagesService.show( msg.message  ,{ cssClass: 'alert-success flash-message', timeout: 4000 });
          },
          err => {
            this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
          });
    }

  }

  ngOnDestroy() {}



}
