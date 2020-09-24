import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusRoutingModule } from './bus-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BusComponent } from './bus.component';
import { AddBusComponent } from './add-bus/add-bus.component';
import { AllLinesComponent } from './all-lines/all-lines.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { BusInfoComponent } from './bus-info/bus-info.component';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    BusComponent,
    AddBusComponent,
    AllLinesComponent,
    BusInfoComponent
  ],
  imports: [
    CommonModule,
    BusRoutingModule,
    FlashMessagesModule.forRoot(),
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ]
})
export class BusModule { }
