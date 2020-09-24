import { Subscription } from 'rxjs';
import { StudentsService } from './../../../../providers/students.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as CanvasJS from '../../../../../assets/js/canvasjs.min';
import * as $ from 'jquery';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html'
})
export class StudentInfoComponent implements OnInit, OnDestroy {

  student;
  studentClass;
  degrees;
  degreesDataPoints = [];

  classAttend;
  classAttendChartDataPoints = [];

  Subscription: Subscription;
  isStudentSpinner = true;

  panelOpenState = true;
  
  constructor(  private router: Router,
                private route: ActivatedRoute, 
                private StudentSrv: StudentsService, ) { }
  
  ngOnInit() {

    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
      if ( paramMap.has('id') ) {
          this.Subscription = this.StudentSrv.getStudent(paramMap.get('id'))
          .subscribe( 
            student => {
              console.log('student =>', student)
              this.student = student.student;
              this.studentClass = student.class;
              this.degrees = student.degrees;
              this.classAttend = student.CAttend;
              // degrees chart
              this.degrees.map( (dx, no) => {
                const o = { y: dx.totalMonthDegrees, name: dx._id }
                this.degreesDataPoints.push(o)
              })
              chart.render();

              // class Attend Chart
              this.classAttend.map( (dx, no) => {
                const o = { y: dx.data.length, name: dx._id }
                this.classAttendChartDataPoints.push(o)
                console.log("classAttendChartDataPoints =>", this.classAttendChartDataPoints)
              })
              classAttendChart.render();

              this.isStudentSpinner = false;
            },
            err =>{
              console.log("err =>", err)
            })
        } else {
          console.log('paramMap --')
        }
      });


      let chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "student degrees Monthly"
        },
        data: [{
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: this.degreesDataPoints
        }]
      });
      chart.render();
  
      let classAttendChart = new CanvasJS.Chart("classAttendChartContainer", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "student attend Monthly"
        },
        data: [{
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
          indexLabel: "{name} - #percent%",
          
          dataPoints: this.classAttendChartDataPoints
        }]
      });
      classAttendChart.render();




 }

ngOnDestroy() {
  this.Subscription.unsubscribe()
}



}
