import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendesComponent } from './attendes.component';
import { BussAttendComponent } from './buss-attend/buss-attend.component';
import { ClassAttendComponent } from './class-attend/class-attend.component';
import { AllAttendesComponent } from './all-attendes/all-attendes.component';
import { AttendInfoComponent } from './attend-info/attend-info.component';

const routes: Routes = [
     { path: '', component: AttendesComponent, children: [
      { path: 'allAttends', component: AllAttendesComponent },
      { path: 'bus', component: BussAttendComponent },
      { path: 'bus/:id/attend', component: BussAttendComponent },
      { path: 'class', component: ClassAttendComponent },
      { path: 'class/:id/attend', component: ClassAttendComponent },
      { path: 'attend/:id/:type/info', component: AttendInfoComponent },
    ]},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendesRoutingModule { }
