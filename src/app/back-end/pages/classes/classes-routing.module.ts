import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassesComponent } from './classes.component';
import { AddClassComponent } from './add-class/add-class.component';
import { AllClassesComponent } from './all-classes/all-classes.component';
import { ClassComponent } from './class/class.component';

const routes: Routes = [

     { path: '', component: ClassesComponent, children: [
      { path: 'addClass', component: AddClassComponent },
      { path: 'allClasses', component: AllClassesComponent },
      { path: 'class/:id/info', component: ClassComponent }
    ]},

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
