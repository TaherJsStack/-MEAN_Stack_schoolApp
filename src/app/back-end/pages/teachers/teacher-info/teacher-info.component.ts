import { TeachersService } from './../../../../providers/teachers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
})
export class TeacherInfoComponent implements OnInit {

  teacher;

  constructor(  private router: Router,
                private route: ActivatedRoute, 
                private teachersSrv: TeachersService ) { }

  ngOnInit() {

    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
      if ( paramMap.has('id') ) {
          this.teacher = this.teachersSrv.getTeacher(paramMap.get('id'));
          console.log('this.teacher =>', this.teacher)
        } else {
          console.log('paramMap --')
        }
      });
  }


}
