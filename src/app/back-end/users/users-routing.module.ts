import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [

    { path: '', component: UsersComponent, children: [
      { path: '', component: LoginComponent},
      { path: '404', component: Page404Component},
      { path: '500', component: Page500Component},
      { path: 'forgotPassword', component: ForgotPasswordComponent },
      // { path: '**', component: Page404Component }
      ]},

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
