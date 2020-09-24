import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ClassesService } from 'src/app/providers/classes.service';
import { AttendesService } from 'src/app/providers/attendes';

@Component({
  selector: 'app-all-attendes',
  templateUrl: './all-attendes.component.html',
  // styleUrls: ['./all-attendes.component.scss']
})
export class AllAttendesComponent implements OnInit, OnDestroy {

  stages;
  levels;
  classes;
  
  attendes;
  busAttend;
  classAttend;

  attendesDay;
  dayAttendes;
  isClassAttend = false;

  subscription: Subscription;

  constructor(
              private classesSrv: ClassesService, 
              private AttendesService: AttendesService,
              ) { }

  ngOnInit() {

    this.AttendesService.getAllAttendes()
    this.subscription = this.AttendesService.getAllAttendUpdatedListener()
    .subscribe( attendes => {
      this.attendes = attendes
      console.log('this.subscription =>', this.attendes)
    })


    // this.classesSrv.getAllStages();
    // this.subscription = this.classesSrv.getAllStagesUpdatedListener()
    // .subscribe( ( stages: {stages: any} )=> {
    //   console.log(' stages studentstData =>',  stages)
    //   this.stages  =  stages.stages;
    //   console.log(' this.stages =>',  this.stages[0].leveles[0]._id)
    //   this.classesSrv.getLevelClasses(this.stages[0].leveles[0]._id);
    // });

    // // get levels
    // this.classesSrv.getAllLevels();
    // this.subscription = this. classesSrv.getAllLevelsUpdatedListener()
    // .subscribe( ( levels: {levels: any} )=> {
    //   console.log(' levels studentstData =>',  levels)
    //   this.levels  =  levels.levels;
    // });

    // get classes

    // this.subscription = this. classesSrv.getLevelClassesUpdatedListener()
    // .subscribe( ( classes: {classes: any} )=> {
    //   console.log(' classes studentstData =>', classes)
    //   this.classes = classes.classes;
    // });

  }

  onMonthAttendes(type, month) {
    console.log('attend, id, month =>', type, month)
    if (type === 'class Attend') {
      this.AttendesService.getClassDayesAttend(month)
      .subscribe( data => {
        this.attendesDay = data.dayesAttend;
        console.log('Dayes data =>', this.attendesDay);
        this.isClassAttend = true;
      })      
    } else {
      this.AttendesService.getBusDayesAttend(month)
      .subscribe( data => {
        this.attendesDay = data.dayesAttend
        console.log('Dayes data =>', this.attendesDay);
        this.isClassAttend = false;
      })
    }
  }

  onDayAttgendes(day) {
    console.log('day ........=>', day)
    console.log('day ........=>', this.attendesDay)
    this.dayAttendes = this.attendesDay.filter( attend => { return attend.day == day } )
    console.log('dayAttendes =>', this.dayAttendes)
  }


  onGetClasses(type, id, monthId) {
    console.log('onGetClasses levelId =>', type, id)
    // this.classesSrv.getLevelClasses(levelId);
    // this.subscription = this. classesSrv.getLevelClassesUpdatedListener()
    // .subscribe( ( classes: {classes: any} )=> {
    //   console.log(' classes studentstData =>', classes)
    //   this.classes = classes.classes;
    // });
  }

  tabChanged(e) {
    console.log('tabChanged =>', e);
    console.log('tabChanged =>', e.tab.textLabel);
    if (e.tab.textLabel == 'class Attend') {
      this.isClassAttend = true;
    } else {
      this.isClassAttend = false;
    }
  }
  onAttendInfo(data, type, day, month ) {
    // console.log('>>>>>>>>>>>>>>>>>>>', data, type, day, month)
    const attendInfo = {
      data:  data,
      tyoe:  type,
      day:   day,
      month: month
    }
    this.AttendesService.addAttendInfo(attendInfo)

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }




}
