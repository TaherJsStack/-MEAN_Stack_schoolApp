import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/attendes/';

@Injectable({
  providedIn: 'root'
})
export class AttendesService {
  
  private attendes    = [];
  private classAttend = [];
  private busAttend   = [];
  attendUpdated  = new Subject();
  busAttendUpdated    = new Subject();

  // attendInfo = new Subject();
  attendInfo = new BehaviorSubject<[]>([]);
  attendInfoCost = this.attendInfo.asObservable();
  attendInfoData = [];
  
  constructor( private http: HttpClient ) { }

  // get all attendes
  getAllAttendes() {
    return this.http.get<{attendes: any, message: string}>( BACKEND_API )
    .subscribe( (allAteData) => {
      
      this.attendes = allAteData.attendes;
      this.attendUpdated.next({
        atendes: [...this.attendes],
        });
    })
  }

  // get all classes attend
  getAllClassesAttend() {
    return this.http.get<{classesAttend: any, message: string}>( BACKEND_API + '/getAllClassesAttend' )
    .subscribe( (classesAteData) => {
      this.classAttend = classesAteData.classesAttend;
      this.attendUpdated.next({
        classesAtend: [...this.classAttend],
        });
    })
  }
  
  getAllAttendUpdatedListener() {
    return this.attendUpdated.asObservable();
  }
  
  // get all class attend
  getClassDayesAttend(month) {
    return this.http.get<{dayesAttend: any, message: string}>( BACKEND_API + month + '/getClassAttendes' )
  }

  // get all buses attend
  getBusDayesAttend(month) {
    return this.http.get<{dayesAttend: any, message: string}>( BACKEND_API  + month + '/getBusAttendes' )
  }

  addClassAttend(data: any) {
    console.log(' add attend data =>', data)
    return this.http.post<{ message: any }>(BACKEND_API + '/addClassAttend', data );
  }

  addBusAttend(data: any) {
    console.log(' add attend data =>', data)
    return this.http.post<{ message: any }>(BACKEND_API + '/addBusAttend', data);
  }

  addAttendInfo(data){
    // this.attendInfoData.push(data);
    // this.attendInfo.next(this.attendInfoData)
    this.attendInfo.next(data)
  }

  onAttendInfo() {
    return this.attendInfo.asObservable();
  }


}
