import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { HelpComponent } from './help/help.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  
  { path: '', component: UserComponent, children: [
    { path: 'profile', component: ProfileComponent},
    { path: 'setting', component: SettingComponent},
    { path: 'help', component: HelpComponent},
    { path: 'changePassword', component: ChangePasswordComponent},
    ]},

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
