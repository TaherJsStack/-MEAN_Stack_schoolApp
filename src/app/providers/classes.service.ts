import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/classes/';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  
  private stages  = [];
  private levels  = [];
  private classes = [];
  stagesUpdated    = new Subject();
  levelsUpdated    = new Subject();
  classesUpdated   = new Subject();

  constructor( private http: HttpClient ) { }

  // get all stages
  getAllStages() {
    return this.http.get<{stages: any, message: string}>( BACKEND_API + '/stages' )
    .subscribe( (stagesData) => {
      this.stages = stagesData.stages;
      this.stagesUpdated.next({
        stages: [...this.stages],
        });
    })
  }

  getAllStagesUpdatedListener() {
    return this.stagesUpdated.asObservable();
  }

  // get all classes
  getLevelClasses(levelId) {
    console.log(BACKEND_API + levelId + '/classes')
    return this.http.get<{classes: any, message: string}>( BACKEND_API + levelId + '/classes' )
    .subscribe( (classesData) => {
      this.classes = classesData.classes;
      console.log('this.classes =>', this.classes)
      this.classesUpdated.next({
        classes: [...this.classes],
        });
    })
  }

  getLevelClassesUpdatedListener() {
    return this.classesUpdated.asObservable();
  }

  getClass(classId) {
    return this.http.get<{ message: any, class: any, textbook: any, exames: any, attends: any }>(BACKEND_API + classId + '/classInfo' );
  }

  addClass(data: any) {
    return this.http.post<{ message: any }>(BACKEND_API, data );
  }

  updateClass(id, newData) {
    return this.http.put<{ message: string}>( BACKEND_API + id, newData );
  }

  deleteClass(id) {
    return this.http.delete<{message: string}>( BACKEND_API + id);
  }
  
  classDetails(id) {}



}
