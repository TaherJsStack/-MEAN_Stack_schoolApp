import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { NgStyle } from '@angular/common';
const BACKEND_API = environment.API_URL + '/students/';

@Injectable({
  providedIn: 'root'
})

export class StudentsService {

  private students = [];
  studentsUpdated = new Subject();
  studentsPayBusUpdated = new Subject();

  constructor( private http: HttpClient ) { }

  getAllStudents(postsPerPage: number, currentPage: number, stageFillter: string = 'all_Stages') {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}&stage=${stageFillter}`;
    return this.http.get<{students: any, message: string, maxPosts: number}>( BACKEND_API + queryParams )
    .subscribe( (studentsData) => {
      this.students = studentsData.students;
      this.studentsUpdated.next({
        students: [...this.students],
        postCount: studentsData.maxPosts
        });
    })
  }

  getStudentsPayBus(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{students: any, message: string, maxPosts: number}>( BACKEND_API + 'getStudentsPayBus' + queryParams )
    .subscribe( (studentsData) => {
      // this.students = studentsData.students;

console.log('getStudentsPayBus ==>', studentsData.students)
      this.studentsPayBusUpdated.next({
        students: studentsData.students,
        postCount: studentsData.maxPosts
        });
    })
  }

  
  getAllstudentsUpdatedListener() {
    return this.studentsUpdated.asObservable();
  }

  getStudentsPayBusUpdatedListener() {
    return this.studentsPayBusUpdated.asObservable();
  }

  getActivestudents() {
    return this.http.get<{message: string, student: any}>( BACKEND_API + '/activeStudents');
  }

  addStudent(data: any) {
    return this.http.post<{ message: any }>(BACKEND_API, data );
  }

  getStudent(id) {
    return this.http.get<{ message: any, student: any, class: any, CAttend: any, BAttend: any, degrees: any }>(BACKEND_API + 'student/' + id)
  }

  updateStudent(id, newData) {
    console.log('update =>', BACKEND_API + id, newData)
    return this.http.put<{ message: string}>(
      BACKEND_API + id, newData
      );
  }

  studentSearch(phoneNo) {
    return this.http.get<{message: string, student: any}>( BACKEND_API + phoneNo + '/seartch');
  }

  studentSearchById(id) {
    return this.http.get<{message: string, student: any}>( BACKEND_API + id + '/studentSearchById');
  }

  studentSearchByEmail(email) {
    return this.http.get<{message: string, student: any}>( BACKEND_API + email + '/emailSearsh');
  }

  educationalStageFillter(stage, postsPerPage, currentPage) {
    const queryParams = `?stage=${stage}&pagesize=${postsPerPage}&page=${currentPage}`;
    console.log('=>>>>>>>>>>>>>>>>>>>>>>', BACKEND_API + '/stageFillter' + queryParams )
    // return this.http.get<{message: string, students: any}>( BACKEND_API  + '/stageFillter' + queryParams );
    return  this.http.get<{students: any, message: string, maxPosts: number}>( BACKEND_API  + '/stageFillter' + queryParams  )
    .subscribe( (studentsData) => {
      this.students = studentsData.students;
      this.studentsUpdated.next({
        students: [...this.students],
        postCount: studentsData.maxPosts
        });
    })
  }

  studentsFillterStageAndLevel(stage, level) {
    return this.http.get<{message: string, students: any}>( BACKEND_API + stage + '/' + level + '/studentsFillterStageLevel');
  }

  studentsChart() {
    console.log('studentsChart=>>>>>>>>>>>>>>> ', BACKEND_API)
    return this.http.get<{message: string, students: any, citesLingth: any}>( BACKEND_API);
  }

  deleteStudent(id, parentEmail, parentPhone) {
    return this.http.delete<{message: string}>( BACKEND_API + id + '/' + parentEmail + '/' +parentPhone);
  }
  
}
