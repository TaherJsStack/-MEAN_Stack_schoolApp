import { UserModule } from './back-end/pages/user/user.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import * as socket from "socket.io-client"

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ParticlesModule } from 'angular-particle';
import { NgwWowModule } from 'ngx-wow';

import { MaterialModule } from './material.module';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ClassesModule } from './back-end/pages/classes/classes.module';
import { EmployeesModule } from './back-end/pages/employees/employees.module';
import { ParentsModule } from './back-end/pages/parents/parents.module';
import { StudentsModule } from './back-end/pages/students/students.module';
import { TeachersModule } from './back-end/pages/teachers/teachers.module';
import { PaymentsModule } from './back-end/pages/payments/payments.module';
import { LibraryModule } from './back-end/pages/library/library.module';
import { BackendModule } from './back-end/backend.module';
import { FrontendModule } from './front-end/frontend.module';
import { AuthGuard } from './providers/auth.guard';
import { ExamesModule } from './back-end/pages/exames/exames.module';
import { AttendesModule } from './back-end/pages/attendes/attendes.module';
import { BusModule } from './back-end/pages/bus/bus.module';
import { UsersModule } from './back-end/users/users.module';
import { AuthInterceptor } from './providers/auth-interceptor';
import { AuthNot } from './providers/authNot.guard';

 
// import {
//   SocialLoginModule,
//   AuthServiceConfig,
//   GoogleLoginProvider,
//   FacebookLoginProvider,
//   LinkedinLoginProvider,
//   VkontakteLoginProvider,
// } from "angular-6-social-login-v2";

// Configs 
// export function getAuthServiceConfigs() {
//   let config = new AuthServiceConfig(
//       [
//         {
//           id: FacebookLoginProvider.PROVIDER_ID,
//           provider: new FacebookLoginProvider("214285446328274")
//         },
//         {
//           id: GoogleLoginProvider.PROVIDER_ID,
//           provider: new GoogleLoginProvider("Your-Google-Client-Id")
//         },
//         {
//           id: VkontakteLoginProvider.PROVIDER_ID,
//           provider: new VkontakteLoginProvider("Your-VK-Client-Id")
//         },        
//           {
//             id: LinkedinLoginProvider.PROVIDER_ID,
//             // provider: new LinkedinLoginProvider("78vxd32oe2gwsl")
//             provider: new LinkedinLoginProvider("78vxd32oe2gwsl.apps.googleusercontent.com")

//           },
//       ]
//   );
//   return config;
// }
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
const config = new AuthServiceConfig([
  // {
  //   id: GoogleLoginProvider.PROVIDER_ID,
  //   provider: new GoogleLoginProvider("121799712368-cdkicl9eaki0gsfkkmibb8ims81e09ud.apps.googleusercontent.com")
  // },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('214285446328274')
  }
]);
export function provideConfig() {
  return config;
}


// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    HttpClientModule,
    BackendModule,
    FormsModule,
    ReactiveFormsModule,
    ParticlesModule,
    ParallaxModule,
    NgwWowModule,
    MaterialModule,
    ClassesModule,
    EmployeesModule,
    ParentsModule,
    StudentsModule,
    TeachersModule,
    PaymentsModule,
    LibraryModule,
    FrontendModule,
    UserModule,
    UsersModule,
    ExamesModule,
    AttendesModule,
    BusModule,
    SocialLoginModule,
    FlashMessagesModule.forRoot(),
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
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: AuthServiceConfig, useFactory: provideConfig },
    // { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
    AuthGuard,
    AuthNot
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
