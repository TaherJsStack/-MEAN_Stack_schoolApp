import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/notification/';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  private notification  = [];
  notificationSub    = new Subject();

  constructor( private http: HttpClient ) { }

  getRegistredUsers() {
    return this.http.get<{ message: any, LogeedUsers: any }>(BACKEND_API + 'registered' );
  }

  sendNewNotifications(data) {
    return this.http.post<{ message: any }>( BACKEND_API + 'sendNotifi', data );
  }
  
  // get all Lines
  // getAllLines() {
  //   return this.http.get<{notification: any,  message: string }>( BACKEND_API )
  //   .subscribe( (notiesData) => {
  //     this.notification = notiesData.notification;
  //     this.linesUpdated.next({
  //       lines: [...this.lines],
  //       });
  //   })
  // }

  // getAllLinesUpdatedListener() {
  //   return this.linesUpdated.asObservable();
  // }

  // addLine(data: any) {
  //   console.log(' add Line data =>', data)
  //   return this.http.post<{ message: any }>(BACKEND_API, data );
  //  }

  // updateLine(id, newData) {
  //   return this.http.put<{ message: string}>(
  //     BACKEND_API + id, newData
  //     );
  // }

  // deleteLine(id) {
  //   return this.http.delete<{message: string}>( BACKEND_API + id);
  // }
  
  // lineDetails(id) {}

}
