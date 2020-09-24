import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/textbook/';

@Injectable({
  providedIn: 'root'
})

export class TextbookService {
  
  private textbooks  = [];
  textbookUpdated    = new Subject();

  constructor( private http: HttpClient ) { }

  getTextbook() {
    return this.http.get<{ textBooks: [], message: string }>( BACKEND_API )
    .subscribe( textbooksData => {
      this.textbooks = textbooksData.textBooks;
      this.textbookUpdated.next(this.textbooks)
    })
  }

  getAllTextbooksUpdatedListener() {
    return this.textbookUpdated.asObservable();
  }

  addTextbook(data: any) {
    return this.http.post<{ message: string }>(BACKEND_API, data );
  }

  getClassTextbooks(stage, level, term) {
    return this.http.get<{ textBooks: any, message: string }>(BACKEND_API + 'class/' + stage + '/' + level + '/' + term);
  }


}
