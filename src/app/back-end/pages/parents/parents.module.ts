import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsRoutingModule } from './parents-routing.module';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ParentsComponent } from './parents.component';
import { AddParentComponent } from './add-parent/add.component';
import { ParentInfoComponent } from './parent-info/parent-info.component';
import { AllParentsComponent } from './all-parents/parents.component';
import { ChildsComponent } from './childs/childs.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    ParentsComponent,
    AddParentComponent,
    ParentInfoComponent,
    AllParentsComponent,
    ChildsComponent,

  ],
  imports: [
    CommonModule,
    ParentsRoutingModule,
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
export class ParentsModule { }
