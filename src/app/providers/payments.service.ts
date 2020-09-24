import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/payments/';

@Injectable({
  providedIn: 'root'
})

export class PaymentsService {

  private payments = [];
  paymentsUpdated = new Subject();
  paymentsByBusUpdated = new Subject();
  constructor( private http: HttpClient ) { }

  getAllPayments(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{payments: any, message: string, maxPosts: number}>( BACKEND_API + queryParams )
    .subscribe( (data) => {
      this.payments = data.payments;
      this.paymentsUpdated.next({
        payments: [...this.payments],
        postCount: data.maxPosts
        });
    })
  }

  getAllSudentPayBus(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{payments: any, message: string, maxPosts: number}>( BACKEND_API + '/studentstPayBus' + queryParams )
    .subscribe( (data) => {
      this.payments = data.payments;
      this.paymentsByBusUpdated.next({
        payments: [...this.payments],
        postCount: data.maxPosts
        });
    })
  }


  getAllPaymentsUpdatedListener() {
    return this.paymentsUpdated.asObservable();
  }

  getAllPaymentsByBusUpdatedListener() {
    return this.paymentsByBusUpdated.asObservable();
  }

  getStatistics() {
    // console.log(' payments + =>',  BACKEND_API + 'payStatistics')
    return this.http.get<{states: any, message: any }>( BACKEND_API + 'payStatistics' ) 
  }

  addPay(data: any) {
    return this.http.post<{ message: any }>(BACKEND_API, data );
   }

  getPay(id) {
    return  {...this.payments.find(p => p._id == id)};
  }

  updatePay(id, newData) {
    console.log('update =>', BACKEND_API + id, newData)
    return this.http.put<{ message: string}>(
      BACKEND_API + id, newData
      );
  }

  deletePay(id) {
    return this.http.delete<{message: string}>( BACKEND_API + id);
  }
  
  paySearch(id) {
    return this.http.get<{message: string, student: any}>( BACKEND_API + id + '/searsh');
  }


}
