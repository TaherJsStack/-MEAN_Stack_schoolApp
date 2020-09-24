import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentsComponent } from './parents.component';
import { AddParentComponent } from './add-parent/add.component';
import { AllParentsComponent } from './all-parents/parents.component';
import { ParentInfoComponent } from './parent-info/parent-info.component';
import { ChildsComponent } from './childs/childs.component';
// import { EmployeesComponent } from './employees.component';
// import { AllEmployeesComponent } from './all-employees/all-employees.component';
// import { AddEmployeeComponent } from './add-employee/add-employee.component';
// import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [

    { path: '', component: ParentsComponent, children: [
      { path: 'addParent', component: AddParentComponent },
      { path: 'allParents', component: AllParentsComponent },
      { path: 'parent/:id/edit', component: AddParentComponent },
      { path: 'parent/:id/info', component: ParentInfoComponent },
      { path: 'parent/:phone/chils', component: ChildsComponent },
    ]},

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsRoutingModule { }
