import { ResultsComponent } from './pages/results/results.component';
import { TextbookComponent } from './pages/textbook/textbook.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackendComponent } from './backend.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoticeComponent } from './pages/notice/notice.component';
import { AuthGuard } from '../providers/auth.guard';
import { Page404Component } from './users/page404/page404.component';
import { NotificationComponent } from './pages/notification/notification.component';

const routes: Routes = [

  {
    path: '', component: BackendComponent, children: [

      // { path: '', component: UsersComponent, children: [
      //   { path: '', component: LoginComponent},
      //   { path: '404', component: Page404Component},
      //   { path: '500', component: Page500Component},
      //   { path: 'forgotPassword', component: ForgotPasswordComponent },
      //   ]},

      {
        path: '',
        loadChildren: () =>
          import('./users/users.module').then(m => m.UsersModule)
      },

      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },

      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

      {
        path: 'user',
        loadChildren: () =>
          import('./pages/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard]
      },

      {
        path: 'parents',
        loadChildren: () =>
          import('./pages/parents/parents.module').then(m => m.ParentsModule), canActivate: [AuthGuard]
      },

      {
        path: 'students',
        loadChildren: () =>
          import('./pages/students/students.module').then(m => m.StudentsModule), canActivate: [AuthGuard]
      },

      {
        path: 'teachers',
        loadChildren: () =>
          import('./pages/teachers/teachers.module').then(m => m.TeachersModule), canActivate: [AuthGuard]
      },

      {
        path: 'employees',
        loadChildren: () =>
          import('./pages/employees/employees.module').then(m => m.EmployeesModule), canActivate: [AuthGuard]
      },

      {
        path: 'payments',
        loadChildren: () =>
          import('./pages/payments/payments.module').then(m => m.PaymentsModule), canActivate: [AuthGuard]
      },

      {
        path: 'classes',
        loadChildren: () =>
          import('./pages/classes/classes.module').then(m => m.ClassesModule), canActivate: [AuthGuard]
      },

      {
        path: 'exames',
        loadChildren: () =>
          import('./pages/exames/exames.module').then(m => m.ExamesModule), canActivate: [AuthGuard]
      },

      {
        path: 'bus',
        loadChildren: () =>
          import('./pages/bus/bus.module').then(m => m.BusModule), canActivate: [AuthGuard]
      },

      {
        path: 'attendes',
        loadChildren: () =>
          import('./pages/attendes/attendes.module').then(m => m.AttendesModule), canActivate: [AuthGuard]
      },

      { path: 'textbook', component: TextbookComponent, canActivate: [AuthGuard] },

      { path: 'results', component: ResultsComponent, canActivate: [AuthGuard] },

      {
        path: 'library',
        loadChildren: () =>
          import('./pages/library/library.module').then(m => m.LibraryModule), canActivate: [AuthGuard]
      },

      { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },

      { path: 'notice', component: NoticeComponent, canActivate: [AuthGuard] },

      // { path: '', redirectTo: '/heroes', pathMatch: 'full' },
      { path: '**', component: Page404Component }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule { }
