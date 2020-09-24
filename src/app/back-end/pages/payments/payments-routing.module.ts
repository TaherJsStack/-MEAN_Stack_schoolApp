import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments.component';
import { AllPaymentsComponent } from './all-payments/all-payments.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
    { path: '', component: PaymentsComponent, children: [
      { path: 'allPayments' , component: AllPaymentsComponent },
      { path: 'addPayment' , component:  AddPaymentComponent},
      { path: 'invoice/:id/info' , component:  InvoiceComponent},
    ]},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
