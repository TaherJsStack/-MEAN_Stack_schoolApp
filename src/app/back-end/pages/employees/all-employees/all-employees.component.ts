import { EmployeesService } from './../../../../providers/employees.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'node_modules/rxjs';
import { PageEvent } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
})
export class AllEmployeesComponent implements OnInit {
  
  employees;
  oneEmployee;
  employeesSub:  Subscription;
  filtteredPro: any[];
  
  totalData       = 0;
  dataPerPage     = 5;
  currentPageData = 1;
  dataPageSizeOptions = [5, 15, 25, 30];

  works = ['all employees', 'Administrative', 'accountant', 'driver', 'worker', 'baby sitter']

  constructor( private  employeesSrv: EmployeesService,
               private _flashMessagesService: FlashMessagesService) {}

  ngOnInit() {

    this.employeesSrv.getAllEmployees( this.dataPerPage, this.currentPageData);
    this.employeesSub = this. employeesSrv.getAllEmployeesUpdatedListener()
    .subscribe( ( employeesstData: {employees: any, postCount: number} )=> {
      console.log(' teacherstData =>',  employeesstData)
      this.totalData = employeesstData.postCount;
      this.employees = employeesstData.employees;
    });

  }

  workTypeFillter(event) {
    console.log('levelChange =>', event.value);
    if (event.value == 'all employees') {
      this.employeesSrv.getAllEmployees( this.dataPerPage, this.currentPageData);
    } 
    this.employeesSub = this.employeesSrv.workTypeFillter(event.value)
    .subscribe( employees => {
      // console.log('parentstData =>', students)
      // this.paginator = false;
      this.employees = employees.employees;
    });
  }

  serchFillter(email) {
    // console.log(email);
    this.employeesSub = this.employeesSrv.employeeSearchByEmail(email)
    .subscribe( employee => {
      this.employees = employee.employee;
    });
  }

 // mat paginator
  onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.currentPageData =  pageData.pageIndex + 1;
    this.dataPerPage =      pageData.pageSize;
    this.employeesSrv.getAllEmployees(this.dataPerPage, this.currentPageData);
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
      this.employeesSrv.deleteEmployee(id)
      .subscribe( msg => {
        this.employeesSrv.getAllEmployees(this.dataPerPage, this.currentPageData);
        this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
      });
   }
  }

  ngOnDestroy() {
    // this.productsSub.unsubscribe();
  }

}
