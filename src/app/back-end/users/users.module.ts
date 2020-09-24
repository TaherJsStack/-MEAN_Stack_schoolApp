import { Page500Component } from './page500/page500.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { Page404Component } from './page404/page404.component';
// import { UsersModule } from './users/users.module';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    UsersComponent,
    ForgotPasswordComponent,
    LoginComponent,
    Page404Component,
    Page500Component,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FlashMessagesModule.forRoot(),
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    // UsersModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
  }),
  NgCircleProgressModule.forRoot({
    // set defaults here
    radius: 100,
    outerStrokeWidth: 16,
    innerStrokeWidth: 8,
    outerStrokeColor: "#78C000",
    innerStrokeColor: "#C7E596",
    animationDuration: 300,
  })
  ]
})
export class UsersModule { }
