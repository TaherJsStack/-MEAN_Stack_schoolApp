import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusService } from 'src/app/providers/bus.service';

@Component({
  selector: 'app-bus-info',
  templateUrl: './bus-info.component.html',
  // styleUrls: ['./bus-info.component.scss']
})
export class BusInfoComponent implements OnInit {

  busInfo;
  Subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private BusService: BusService
  ) { }

  ngOnInit() {

    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
      if ( paramMap.has('id') ) {
          console.log('bus attend => ', paramMap.has('id'))
          this.Subscription = this.BusService.getLine(paramMap.get('id'))
          .subscribe( busData => {
            this.busInfo = busData.bus;
            console.log('this.busInfo =>', busData)
          })
        } else {
       
        }
      });

  }

}
