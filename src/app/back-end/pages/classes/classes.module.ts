import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { AddClassComponent } from './add-class/add-class.component';
import { AllClassesComponent } from './all-classes/all-classes.component';
import { ClassComponent } from './class/class.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    ClassesComponent,     
    AddClassComponent,
    AllClassesComponent,
    ClassComponent,
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
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

export class ClassesModule { }
