import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AttendesService } from 'src/app/providers/attendes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-attend-info',
  templateUrl: './attend-info.component.html',
  styleUrls: ['./attend-info.component.scss']
})
export class AttendInfoComponent implements OnInit {

  Subscription: Subscription;

  attendInfoData;


  constructor( 
    private router: Router, 
    private route: ActivatedRoute, 
    private AttendesService: AttendesService ) { }

  ngOnInit() {

    this.Subscription = this.AttendesService.attendInfoCost.subscribe( 
      data =>{
         console.log(' o =>', data)
         this.attendInfoData = data;
         console.log(' this.attendInfoData =>', this.attendInfoData)

        })


    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
      if ( paramMap.has('id') ) {
          if (paramMap.get('type') === 'class') {
            console.log('type', paramMap.get('type'))
            
          } else {
            console.log('type', paramMap.get('type'))
            
          }
        } else {
          console.log('paramMap --')
        }
      });
  }

}
