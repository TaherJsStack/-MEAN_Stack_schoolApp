import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsRoutingModule } from './payments-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { PaymentsComponent } from './payments.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AllPaymentsComponent } from './all-payments/all-payments.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    PaymentsComponent,
    AddPaymentComponent,
    InvoiceComponent,
    AllPaymentsComponent,
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
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
export class PaymentsModule { }
