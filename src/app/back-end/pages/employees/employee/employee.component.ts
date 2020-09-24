import { EmployeesService } from './../../../../providers/employees.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  // styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employee;

  constructor(  private router: Router,
                private route: ActivatedRoute, 
                private employeesSrv: EmployeesService ) { }


  ngOnInit() {
    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
      if ( paramMap.has('id') ) {
          this.employee = this.employeesSrv.getEmployee(paramMap.get('id'));
          console.log('this.teacher =>', this.employee)
        } else {
          console.log('paramMap --')
        }
      });
  }

}
