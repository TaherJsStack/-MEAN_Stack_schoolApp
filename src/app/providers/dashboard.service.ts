import { Injectable } from '@angular/core';
import { EmployeesService } from './employees.service';
import { Subscription } from 'rxjs';
import { ParentsService } from './parents.service';
import { StudentsService } from './students.service';
import { PaymentsService } from './payments.service';
import { TeachersService } from './teachers.service';

import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/employees/';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  totalData       = 0;
  dataPerPage     = 5;
  currentPageData = 1;
  dataPageSizeOptions = [5, 15, 25, 30];

  subscription:  Subscription;

  constructor(
    private employeeSrv: EmployeesService,
    private parentsSrv:  ParentsService,
    private studentsSrv: StudentsService,
    private paymentsSrv: PaymentsService,
    private teachersSrv: TeachersService
  ) { }

  ngOnInit() {

  }



}
