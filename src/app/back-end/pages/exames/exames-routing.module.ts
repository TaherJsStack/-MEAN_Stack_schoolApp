import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinalComponent } from './final/final.component';
import { MonthlyComponent } from './monthly/monthly.component';
import { ExamesComponent } from './exames.component';

const routes: Routes = [
     { path: '', component: ExamesComponent, children: [
      { path: 'final', component: FinalComponent },
      { path: 'monthly', component: MonthlyComponent },
      // { path: 'class/:id/info', component: ClassComponent }
    ]},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamesRoutingModule { }
