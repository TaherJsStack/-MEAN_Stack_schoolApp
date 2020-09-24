import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  // styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  constructor(private translate: TranslateService) { 
    this.translate.use('en');
  }

  ngOnInit() {
  }

  changeLang(lang: string) {
    // console.log('changeLang =>',lang)
    this.translate.use(lang);
  }

}
