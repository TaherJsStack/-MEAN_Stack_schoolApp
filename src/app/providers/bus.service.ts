import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/bus/';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  
  private lines  = [];
  linesUpdated    = new Subject();

  constructor( private http: HttpClient ) { }

  // get all Lines
  getAllLines() {
    return this.http.get<{lines: any, message: string}>( BACKEND_API )
    .subscribe( (linesData) => {
      this.lines = linesData.lines;
      this.linesUpdated.next({
        lines: [...this.lines],
        });
    })
  }

  getAllLinesUpdatedListener() {
    return this.linesUpdated.asObservable();
  }

  getLine(busId) {
    console.log('busId =>', busId)
    return this.http.get<{ message: any, bus: any, attends: any }>(BACKEND_API + busId + '/busInfo' );
  }

  addLine(data: any) {
    console.log(' add Line data =>', data)
    return this.http.post<{ message: any }>(BACKEND_API, data );
   }

  searchByAreaName(name) {
    return this.http.get<{message: string, bus: any}>( BACKEND_API + name + '/searshByAreaname');
  }

  updateLine(id, newData) {
    return this.http.put<{ message: string}>( BACKEND_API + id, newData );
  }

  deleteLine(id) {
    return this.http.delete<{message: string}>( BACKEND_API + id);
  }
  
  lineDetails(id) {}

}
