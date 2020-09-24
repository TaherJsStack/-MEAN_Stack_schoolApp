import { ParentModel } from './../../../../models/parent';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ParentsService } from 'src/app/providers/parents.service';
import { SettingsService } from 'src/app/providers/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-parent-info',
  templateUrl: './parent-info.component.html',
  // styleUrls: ['./parent-info.component.scss']
})
export class ParentInfoComponent implements OnInit {
 
  textDir;
  childes;
  parent: ParentModel;
  Subscription: Subscription;
  
  constructor(  private router: Router,
                private route: ActivatedRoute, 
                private ParentsSrv: ParentsService,
                private translate:  TranslateService, 
                private SettingsService: SettingsService
                ) { }

  ngOnInit() {

    this.SettingsService.getLangStorage().subscribe(data => {
      this.textDir = localStorage.getItem('lang');
      this.translate.use(localStorage.getItem('lang')); 
      console.log('getLangStorage =>', data)
      console.log('textDir =>', this.textDir)
    })

    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
      if ( paramMap.has('id') ) {
          this.ParentsSrv.parentDetails(paramMap.get('id'))
          .subscribe( parent => {
            this.parent = parent.parent;          
            if(this.parent) {
              this.ParentsSrv.getParentChilds(this.parent.email, this.parent.phone)
              .subscribe( childes => {
                // console.log('this.parent childes =>', childes)
                this.childes = childes.childes
              });
            }
          });
        } else {
          console.log('paramMap --')
          this.router.navigate(['/parents/allParents'])
        }
      });
  }

}
