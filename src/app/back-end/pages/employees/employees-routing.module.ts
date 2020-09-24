import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [

    { path: '', component: EmployeesComponent, children: [
      { path: 'allEmployees', component: AllEmployeesComponent},
      { path: 'addEmployees', component: AddEmployeeComponent},
      { path: 'employee/:id/edit', component: AddEmployeeComponent},
      { path: 'employee/:id/info', component: EmployeeComponent},
    ]},

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
