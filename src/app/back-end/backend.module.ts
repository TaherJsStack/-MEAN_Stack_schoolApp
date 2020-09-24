import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendRoutingModule } from './backend-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BackendComponent } from './backend.component';
import { NavTopComponent } from './nav-top/nav-top.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoticeComponent } from './pages/notice/notice.component';
import { AllComponent } from './pages/notice/all/all.component';
import { AddNoteComponent } from './pages/notice/add-note/add-note.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { UsersModule } from './users/users.module';
import { NotificationComponent } from './pages/notification/notification.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TextbookComponent } from './pages/textbook/textbook.component';
import { ResultsComponent } from './pages/results/results.component';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    BackendComponent,
    NavTopComponent,
    SideMenuComponent,
    PagesComponent,
    DashboardComponent,
    NoticeComponent,
    AllComponent,
    AddNoteComponent,
    NotificationComponent,
    TextbookComponent,
    ResultsComponent,

  ],
  imports: [
    CommonModule,
    BackendRoutingModule,
    FlashMessagesModule.forRoot(),
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UsersModule,
    MatSidenavModule,
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
export class BackendModule { }
