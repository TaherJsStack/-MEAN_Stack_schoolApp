import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClassesService } from 'src/app/providers/classes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  // styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit, OnDestroy {

  classInfo;
  textbooks;
  attends;
  exames;
  Subscription: Subscription;
  isClassSpinner = true;
  panelOpenState = false;

  constructor(  private route: ActivatedRoute, 
                private ClassesService: ClassesService, ) { }

  ngOnInit() {

    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
      if ( paramMap.has('id') ) {
          this.Subscription = this.ClassesService.getClass(paramMap.get('id'))
          .subscribe( classData => {
            this.classInfo = classData;
            this.textbooks = classData.textbook;
            this.attends   = classData.attends; 
            this.exames    = classData.exames;
            this.isClassSpinner = false;
             console.log('classData ', classData)
             console.log('classData textbook', classData.textbook)
             console.log('classData exames', classData.exames)
             console.log('classData class', this.classInfo.class)
             console.log('classData class', this.classInfo)
          });
        } else {
          console.log('paramMap --')
        }
      });
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }


}

