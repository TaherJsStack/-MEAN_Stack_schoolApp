import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { AllTeachersComponent } from './all-teachers/teachers.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { TeacherInfoComponent } from './teacher-info/teacher-info.component';

const routes: Routes = [

  { path: '', component: TeachersComponent, children: [
    { path: 'allTeachers', component: AllTeachersComponent},
    { path: 'addTeacher', component: AddTeacherComponent},
    { path: 'teacher/:id/edit', component: AddTeacherComponent},
    { path: 'teacher/:id/info', component: TeacherInfoComponent},
    ]},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
