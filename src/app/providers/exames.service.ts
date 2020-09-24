import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/exames/';

@Injectable({
  providedIn: 'root'
})
export class ExamesService {
  
  private exames    = [];
  examesUpdated    = new Subject();

  constructor( private http: HttpClient ) { }

  // get all exames
  // getAllExames() {
  //   return this.http.get<{exames: any, message: string}>( BACKEND_API )
  //   .subscribe( (allAteData) => {
  //     this.exames = allAteData.exames;
  //     this.examesUpdated.next({
  //       exames: [...this.exames],
  //       });
  //   })
  // }
  
  getAllExamesUpdatedListener() {
    return this.examesUpdated.asObservable();
  }

  getExame() {
    return this.http.get<{ message: any, exames: any }>(BACKEND_API);
  }

  addExame(data: any) {
    console.log(' add exames data =>', data)
    return this.http.post<{ message: any }>(BACKEND_API, data);
  }
  
  getAllTextbookExamResult(stage, level, className, term, month, textbook) {
    const queryParams = `?stage=${stage}&level=${level}&className=${className}&term=${term}&month=${month}&textbook=${textbook}`;
    console.log(' queryParams =>', queryParams)
    return this.http.get<{ exameResults: any, message: any }>(BACKEND_API + '/examResult' +  queryParams);

  }

}
