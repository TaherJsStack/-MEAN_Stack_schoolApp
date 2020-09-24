import { StudentsService } from 'src/app/providers/students.service';
import { PaymentsService } from './../../../../providers/payments.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
})
export class InvoiceComponent implements OnInit {

  payment;
  student;
  
  date = new Date();

  constructor(
                private StudentsService: StudentsService,
                private router: Router,
                private route: ActivatedRoute, 
                private PaymentsService: PaymentsService,
  ) { }

  ngOnInit() {

    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
      if ( paramMap.has('id') ) {
          this.PaymentsService.paySearch(paramMap.get('id')).
          subscribe(payment => {
            console.log('d ===============>', payment.student)
            this.payment = payment.student;
            this.StudentsService.studentSearchById( payment.student.student_id)
            .subscribe( student => {
              console.log('s ==================>', student)
              this.student = student.student;
            })
          })
        }
      });


  }

}
