import { BusInfoComponent } from './bus-info/bus-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusComponent } from './bus.component';
import { AddBusComponent } from './add-bus/add-bus.component';
import { AllLinesComponent } from './all-lines/all-lines.component';

const routes: Routes = [
     { path: '', component: BusComponent, children: [
      { path: 'addBus', component: AddBusComponent },
      { path: 'allLines', component: AllLinesComponent },
      { path: 'bus/:id/info', component: BusInfoComponent }
    ]},

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusRoutingModule { }
