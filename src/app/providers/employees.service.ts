import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/employees/';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  
  private employees = [];
  employeesUpdated = new Subject();

  constructor( private http: HttpClient ) { }

  getAllEmployees(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{employees: any, message: string, maxPosts: number}>( BACKEND_API + queryParams )
    .subscribe( (employeesData) => {
      this.employees = employeesData.employees;
      this.employeesUpdated.next({
        employees: [...this.employees],
        postCount: employeesData.maxPosts
        });
    })
  }

  getAllEmployeesUpdatedListener() {
    return this.employeesUpdated.asObservable();
  }

  addEmployee(data: any) {
    return this.http.post<{ message: any }>(BACKEND_API, data );
   }

  getEmployee(id) {
    return  {...this.employees.find(t => t._id == id)};
  }

  updateEmployee(id, newData) {
    return this.http.put<{ message: string}>(
      BACKEND_API + id, newData
      );
  }

  deleteEmployee(id) {
    return this.http.delete<{message: string}>( BACKEND_API + id);
  }
  
  employeeDetails(id) {}

  employeeSearchByEmail(email) {
    return this.http.get<{message: string, employee: any}>( BACKEND_API + email + '/emailSearsh');
  }

  workTypeFillter(workType) {
    return this.http.get<{message: string, employees: any}>( BACKEND_API + workType + '/workTypeFillter');
  }

}
