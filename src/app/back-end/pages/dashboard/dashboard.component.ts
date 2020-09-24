import { EmployeesService } from './../../../providers/employees.service';
import { DashboardService } from './../../../providers/dashboard.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { ParentsService } from 'src/app/providers/parents.service';
import { StudentsService } from 'src/app/providers/students.service';
import { PaymentsService } from 'src/app/providers/payments.service';
import { TeachersService } from 'src/app/providers/teachers.service';
import { SettingsService } from 'src/app/providers/settings.service';
import { WOW } from 'wowjs/dist/wow.min';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  // styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  textDir;

  isChartSpinner = true;
  isProgressSpinner = true;

  LineChart = [];
  BarChart  = [];
  PieChart  = [];

  totalData       = 0;
  dataPerPage     = 5;
  currentPageData = 1;
  dataPageSizeOptions = [5, 15, 25, 30];

  parents:   number = 0;
  students:  number = 0;
  teachers:  number = 0;
  employees: number = 0;

  allPayLength:    number = 0;
  bussPayValue:    number = 0;
  booksPayValue:   number = 0;
  schoolPayValue:  number = 0;
  clothesPayValue: number = 0;  
  
  subscription:  Subscription;

  constructor( 
    private SettingsService: SettingsService,
    private dashboardServe: DashboardService,
    private employeesSrv:   EmployeesService,
    private parentsSrv:    ParentsService,
    private studentsSrv:   StudentsService,
    private paymentsSrv:   PaymentsService,
    private teachersSrv:   TeachersService ) {
  }
  ngAfterViewInit(){

    new WOW().init();
  }
  
  ngOnInit() {

    // get Lang Storage
    this.textDir = localStorage.getItem('lang');
    this.SettingsService.getLangStorage().subscribe(data => {
      console.log('getLangStorage =>', data)
      this.textDir = localStorage.getItem('lang');
    })

    // get All Parents
    this.parentsSrv.getAllParents( this.dataPerPage, this.currentPageData);
    this.subscription = this.parentsSrv.getAllParentsUpdatedListener()
    .subscribe( ( parentsData: {parents: any, postCount: number} )=> {
      this.parents = parentsData.postCount;
    });

    // get All Students
    this.studentsSrv.getAllStudents( this.dataPerPage, this.currentPageData);
    this.subscription = this.studentsSrv.getAllstudentsUpdatedListener()
    .subscribe( ( studentsData: {students: any, postCount: number} )=> {
      this.students = studentsData.postCount
    });

    // get All Teachers
    this.teachersSrv.getAllTeachers( this.dataPerPage, this.currentPageData);
    this.subscription = this.teachersSrv.getAllteachersUpdatedListener()
    .subscribe( ( teachersData: {teachers: any, postCount: number} )=> {
      this.teachers = teachersData.postCount      
    });

    // get All Employees
    this.employeesSrv.getAllEmployees( this.dataPerPage, this.currentPageData);
    this.subscription = this.employeesSrv.getAllEmployeesUpdatedListener()
    .subscribe( ( employeesData: {employees: any, postCount: number} )=> {
      this.employees = employeesData.postCount
    });

    // get Statistics
    this.paymentsSrv.getStatistics()
    .subscribe( ( payments ) => {
      console.log('this paymentsSrv getStatistics =>', payments.states)
      this.allPayLength    = payments.states.payLength;
      this.bussPayValue    = payments.states.bussState;
      this.booksPayValue   = payments.states.booksState;
      this.schoolPayValue  = payments.states.schoolState;
      this.clothesPayValue = payments.states.clothesState; 
      
      this.isChartSpinner = false;
      this.isProgressSpinner = false;
      // Line Chart
      this.LineChart = new Chart('lineChart', {
        type: 'line',
        data: {
         labels: ['pay', 'bus', 'book', 'school', 'clothes'],
         datasets: [{
             label: 'Number of Items Sold in Months',
             data: [payments.states.payLength, payments.states.bussState, payments.states.booksState, payments.states.schoolState, payments.states.clothesState],
             fill: false,
             lineTension: 0.2,
             borderColor: 'red',
             borderWidth: 1
         }]
        },
        options: {
         title: {
             text: 'Line Chart',
             display: true
         },
         scales: {
             yAxes: [{
                 ticks: {
                     beginAtZero: true
                   }
               }]
           }
          }
          });
  
      // Bar chart:
      this.BarChart = new Chart('barChart', {
        type: 'bar',
        data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [9, 7, 3, 5, 2, 10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
        },
        options: {
        title: {
            text: 'Bar Chart',
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
        }
        });

      // pie chart:
      this.PieChart = new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: ['red', 'green', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 8, 3, 5, 2, 15],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
        },
        options: {
            title: {
                text: 'Bar Chart',
                display: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
          }
        });


    });


    // this.studentsSrv.studentsChart()
    // .subscribe(
    //   students => {
    //     console.log('students.citesLingth =>', students)
    //   },
    //   err => {
    //     console.log('students.citesLingth err =>', err)
    //   })

 // ==================================== chart  =====================================================

    // Line chart:
    // this.LineChart = new Chart('lineChart', {
    //   type: 'line',
    //   data: {
    //    labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //    datasets: [{
    //        label: 'Number of Items Sold in Months',
    //        data: [9, 7, 3, 5, 2, 10, 15, 16, 19, 3, 1, 9],
    //        fill: false,
    //        lineTension: 0.2,
    //        borderColor: 'red',
    //        borderWidth: 1
    //    }]
    //   },
    //   options: {
    //    title: {
    //        text: 'Line Chart',
    //        display: true
    //    },
    //    scales: {
    //        yAxes: [{
    //            ticks: {
    //                beginAtZero: true
    //              }
    //          }]
    //      }
    //     }
    //     });

    // // Bar chart:
    // this.BarChart = new Chart('barChart', {
    //   type: 'bar',
    //   data: {
    //    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //    datasets: [{
    //        label: '# of Votes',
    //        data: [9, 7, 3, 5, 2, 10],
    //        backgroundColor: [
    //            'rgba(255, 99, 132, 0.2)',
    //            'rgba(54, 162, 235, 0.2)',
    //            'rgba(255, 206, 86, 0.2)',
    //            'rgba(75, 192, 192, 0.2)',
    //            'rgba(153, 102, 255, 0.2)',
    //            'rgba(255, 159, 64, 0.2)'
    //        ],
    //        borderColor: [
    //            'rgba(255,99,132,1)',
    //            'rgba(54, 162, 235, 1)',
    //            'rgba(255, 206, 86, 1)',
    //            'rgba(75, 192, 192, 1)',
    //            'rgba(153, 102, 255, 1)',
    //            'rgba(255, 159, 64, 1)'
    //        ],
    //        borderWidth: 1
    //    }]
    //   },
    //   options: {
    //    title: {
    //        text: 'Bar Chart',
    //        display: true
    //    },
    //    scales: {
    //        yAxes: [{
    //            ticks: {
    //                beginAtZero: true
    //            }
    //        }]
    //    }
    //   }
    //   });

    // // pie chart:
    // this.PieChart = new Chart('pieChart', {
    //   type: 'pie',
    //   data: {
    //     labels: ['allPayLength', 'bussPayValue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //         label: '# of Votes',
    //         data: [this.allPayLength, this.bussPayValue , 3, 5, 2, 15],
    //         backgroundColor: [
    //             'rgba(255, 99, 132, 0.2)',
    //             'rgba(54, 162, 235, 0.2)',
    //             'rgba(255, 206, 86, 0.2)',
    //             'rgba(75, 192, 192, 0.2)',
    //             'rgba(153, 102, 255, 0.2)',
    //             'rgba(255, 159, 64, 0.2)'
    //         ],
    //         borderColor: [
    //             'rgba(255,99,132,1)',
    //             'rgba(54, 162, 235, 1)',
    //             'rgba(255, 206, 86, 1)',
    //             'rgba(75, 192, 192, 1)',
    //             'rgba(153, 102, 255, 1)',
    //             'rgba(255, 159, 64, 1)'
    //         ],
    //         borderWidth: 1
    //     }]
    //   },
    //   options: {
    //       title: {
    //           text: 'Bar Chart',
    //           display: true
    //       },
    //       scales: {
    //           yAxes: [{
    //               ticks: {
    //                   beginAtZero: true
    //               }
    //           }]
    //       }
    //     }
    //   });

     
}


  ngOnDestroy() {
    // this.cateSubs.unsubscribe();
    // this.produSub.unsubscribe();
    // this.usersSub.unsubscribe();
    // this.authListenerSubs.unsubscribe();

  }

}
