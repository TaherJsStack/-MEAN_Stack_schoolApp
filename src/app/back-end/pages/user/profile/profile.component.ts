import { Subscription } from 'rxjs';
import { EmployeesService } from './../../../../providers/employees.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {


  admin;
  authors;
  socialAuth;
  editMode;

  error;
  employees;
  totalData       = 0;
  dataPerPage     = 5555;
  currentPageData = 1;
  dataPageSizeOptions = [5555, 155505, 222225, 3000000];
  subscription: Subscription;

  constructor( private employeesSrv: EmployeesService, 
               private AuthService: AuthService,
               private FlashMessagesService: FlashMessagesService) { }

  ngOnInit() {

    this.employeesSrv.getAllEmployees( this.dataPerPage, this.currentPageData);
    this.subscription = this. employeesSrv.getAllEmployeesUpdatedListener()
    .subscribe( ( employeesstData: {employees: any, postCount: number} )=> {
      console.log(' employeesstData =>',  employeesstData)
      this.totalData = employeesstData.postCount;
      this.employees = employeesstData.employees;
    });

    this.subscription = this.AuthService.getAuthors()
    .subscribe( 
      authors => { 
        console.log('AuthService.authors authors', authors)
        this.authors = authors.authors
      },
      err  => { console.log('AuthService.authors err', err) }
      )

    this.subscription = this.AuthService.getSocialAuth()
    .subscribe( 
      authors => { 
        console.log('AuthService.authors authors', authors)
        this.socialAuth = authors.authors
      },
      err  => { console.log('AuthService.authors err', err) }
      )

    this.subscription = this.AuthService.getAuthInfo('5e6a54e19d245039203152fa')
    .subscribe( 
      auth => { 
        console.log('AuthService.getAuthInfo', auth.auth)
        this.admin = auth.auth
      },
      err  => { console.log('AuthService.getAuthInfo err', err) }
      )
    
  }

  authChange(e){ 
    console.log('authChange=========>', e)
  }

  onSave(data: NgForm) {
    console.log('data ======>', data )

    if (data.value.password === data.value.confPassword) {
      const authData = {
        auth: data.value.auth,
        roll: data.value.auth.roll,
        email: data.value.auth.email,
        password: data.value.password
      }
      this.AuthService.addNewAuth(authData)
      .subscribe(
        msg => {
          this.FlashMessagesService.show( msg.message  ,{ cssClass: 'alert-success flash-message', timeout: 4000 });
          data.reset();
          data.resetForm()
        },
        err => {
          this.error = err;
          this.FlashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
      
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
