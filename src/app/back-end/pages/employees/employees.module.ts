import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { EmployeesComponent } from './employees.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee/employee.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    EmployeesComponent,
    AllEmployeesComponent,
    AddEmployeeComponent,
    AddEmployeeComponent,
    EmployeeComponent,
    // EmployeesComponen
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
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
export class EmployeesModule { }
