import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClassesService } from 'src/app/providers/classes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-classes',
  templateUrl: './all-classes.component.html',
  // styleUrls: ['./all-classes.component.scss']
})
export class AllClassesComponent implements OnInit, OnDestroy {

  stages;
  levels;
  classes;
  subscription: Subscription;
  isClassSpinner = true;

  constructor(private classesSrv: ClassesService,) { }

  ngOnInit() {
    this.classesSrv.getAllStages();
    this.subscription = this. classesSrv.getAllStagesUpdatedListener()
    .subscribe( ( stages: {stages: any} )=> {
      // console.log(' stages studentstData =>',  stages)
      this.stages  =  stages.stages;
      // console.log(' this.stages =>',  this.stages[0].leveles[0]._id)
      this.classesSrv.getLevelClasses(this.stages[0].leveles[0]._id);
    });

  }

  onGetClasses(levelId) {
    // console.log('onGetClasses levelId =>', levelId)
    this.subscription.unsubscribe();
    this.classesSrv.getLevelClasses(levelId);
    this.subscription = this.classesSrv.getLevelClassesUpdatedListener()
    .subscribe( ( classes: {classes: any} )=> {
      // console.log(' classes studentstData =>', classes)
      this.classes = classes.classes;
    });
  }

  tabChanged(e) {
    // console.log('afterViewInit =>', e);
    // console.log('afterViewInit =>', e.tab.textLabel);
    this.subscription.unsubscribe();
    this.classesSrv.getLevelClasses(this.stages[0].leveles[0]._id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
