import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendesRoutingModule } from './attendes-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BussAttendComponent } from './buss-attend/buss-attend.component';
import { ClassAttendComponent } from './class-attend/class-attend.component';
import { AttendesComponent } from './attendes.component';
import { AllAttendesComponent } from './all-attendes/all-attendes.component';
import { AttendInfoComponent } from './attend-info/attend-info.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AttendesComponent,
    BussAttendComponent,
    ClassAttendComponent,
    AllAttendesComponent,
    AttendInfoComponent
  ],
  imports: [
    CommonModule,
    AttendesRoutingModule,
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
export class AttendesModule { }
