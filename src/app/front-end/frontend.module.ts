import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendRoutingModule } from './frontend-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FrontEndComponent } from './front-end.component';
import { HeaderComponent } from './header/header.component';
import { PagesComponent } from './pages/pages.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './pages/index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    FrontEndComponent,
    HeaderComponent,
    PagesComponent,
    FooterComponent,
    IndexComponent,
    AboutComponent,
    ContactComponent,

  ],
  imports: [
    CommonModule,
    FrontendRoutingModule,
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
export class FrontendModule { }
