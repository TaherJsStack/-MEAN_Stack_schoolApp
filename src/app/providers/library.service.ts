import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/library/';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

 
  private library = [];
  libraryUpdated = new Subject();

  constructor( private http: HttpClient ) { }

  getAllLibrary(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{library: any, message: string, maxPosts: number}>( BACKEND_API + queryParams )
    .subscribe( (libraryData) => {
      // console.log(' libraryData', libraryData)
      this.library = libraryData.library;
      this.libraryUpdated.next({
        library: [...this.library],
        postCount: libraryData.maxPosts
        });
    })
  }

  getAllLibraryUpdatedListener() {
    return this.libraryUpdated.asObservable();
  }

  addBook(data: any) {
    return this.http.post<{ message: any }>(BACKEND_API, data );
   }

  getBook(id) {
    return  {...this.library.find(t => t._id == id)};
  }

  updateBook(id, newData) {
    return this.http.put<{ message: string}>(
      BACKEND_API + id, newData
      );
  }

  deleteLibrary(id) {
    return this.http.delete<{message: string}>( BACKEND_API + id);
  }


  workTypeFillter(workType) {
    return this.http.get<{message: string, employees: any}>( BACKEND_API + workType + '/LibraryFillter');
  }


}
