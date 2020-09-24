import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/parents/';

@Injectable({
  providedIn: 'root'
})
export class ParentsService {

  private parents = [];
  parentsUpdated = new Subject();

  constructor( private http: HttpClient ) { }

  getAllParents(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{parents: any, message: string, maxPosts: number}>( BACKEND_API + queryParams )
    .subscribe( (parentsData) => {
      // console.log('parentsData =>', parentsData)
      this.parents = parentsData.parents;
      this.parentsUpdated.next({
        parents: [...this.parents],
        postCount: parentsData.maxPosts
        });
    })
  }

  getAllParentsUpdatedListener() {
    return this.parentsUpdated.asObservable();
  }

  addParent(data: any) {
    this.parents.push(data);
    // console.log('addParent =>', data)
    return this.http.post<{ message: any, newParentID: any}>(BACKEND_API, data );
   }

  getParent(id) {
    return  {...this.parents.find(p => p._id == id)};
  }

  updateParent(id, newData) {
    return this.http.put<{ message: string}>( BACKEND_API + id, newData );
  }

  parentDetails(id) {
    return this.http.get<{message: string, parent: any}>( BACKEND_API + id + '/searshById');
  }

  searchFindOne(email) {
    return this.http.get<{message: string, parents: any}>( BACKEND_API + email + '/searshByEmail');
  }

  getParentChilds(parentEmail, parentPhone) {
    return this.http.get<{message: string, childes: any}>( BACKEND_API + parentEmail +'/'+ parentPhone + '/childes');
  }

  getChilds(phone) {
    return this.http.get<{message: string, parent: any}>( BACKEND_API + phone + '/chils');
  }

  deleteParent(email, phone, id) {
    return this.http.delete<{message: string}>( BACKEND_API + email +'/'+ phone +'/'+ id );
  }
  

}
