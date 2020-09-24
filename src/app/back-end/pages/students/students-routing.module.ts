import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { AllStudentsComponent } from './all-students/students.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentInfoComponent } from './student-info/student-info.component';

const routes: Routes = [

    { path: '', component: StudentsComponent, children: [
      { path: 'allStudents', component: AllStudentsComponent },
      { path: 'addStudent', component: AddStudentComponent },
      { path: 'student/:id/edit', component: AddStudentComponent },
      { path: 'student/:id/info', component: StudentInfoComponent },
    ]},

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
