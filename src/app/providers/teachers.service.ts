import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/teachers/';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {


  private teachers = [];
  teachersUpdated = new Subject();

  constructor( private http: HttpClient ) { }

  getAllTeachers(postsPerPage: number, currentPage: number, stageFillter: string = 'all_Stages') {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}&stage=${stageFillter}`;
    return this.http.get<{teachers: any, message: string, maxPosts: number}>( BACKEND_API + queryParams )
    .subscribe( (teachersData) => {
      this.teachers = teachersData.teachers;
      this.teachersUpdated.next({
        teachers: [...this.teachers],
        postCount: teachersData.maxPosts
        });
    })
  }

  getAllteachersUpdatedListener() {
    return this.teachersUpdated.asObservable();
  }

  addTeacher(data: any) {
    console.log('parentData.append', data)
    return this.http.post<{ message: any }>(BACKEND_API, data );
   }

  getTeacher(id) {
    return  {...this.teachers.find(t => t._id == id)};
  }

  updateTeacher(id, newData) {
    console.log('update =>', BACKEND_API + id, newData)
    return this.http.put<{ message: string}>(
      BACKEND_API + id, newData
      );
  }

  deleteTeacher(id) {
    return this.http.delete<{message: string}>( BACKEND_API + id);
  }
  
  teacherDetails(id) {}

  teacherSearchByEmail(email) {
    return this.http.get<{message: string, teacher: any}>( BACKEND_API + email + '/emailSearsh');
  }
 
  educationalStageFillter(postsPerPage, currentPage, stage: string = 'all_Stages') {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}&stage=${stage}`;
    // console.log('=>>>>>>>>>>>>>>>>>>>>>>', BACKEND_API + '/stageFillter' + queryParams )
    return  this.http.get<{teachers: any, message: string, maxPosts: number}>( BACKEND_API  + '/stageFillter' + queryParams  )
    .subscribe( (teachersData) => {
      this.teachers = teachersData.teachers;
      this.teachersUpdated.next({
        teachers: [...this.teachers],
        postCount: teachersData.maxPosts
        });
    })
  }

  getTeacherByStage(stage) {
    // console.log('getTeacherByStage =>', stage)
    // console.log('getTeacherByStage API =>', BACKEND_API  + 'teatcherByStage/' + stage)
    return  this.http.get<{teachers: any, message: string}>( BACKEND_API  + 'teatcherByStage/' + stage)
  } 

}
