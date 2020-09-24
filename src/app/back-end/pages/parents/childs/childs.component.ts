import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ParentsService } from 'src/app/providers/parents.service';

@Component({
  selector: 'app-childs',
  templateUrl: './childs.component.html',
  styleUrls: ['./childs.component.scss']
})
export class ChildsComponent implements OnInit {

  constructor(
              private route: ActivatedRoute,
              private ParentsSrv: ParentsService,
            ) { }

  ngOnInit() {

    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
      if ( paramMap.has('phone') ) {
          console.log('parent phone => ', paramMap.has('phone'))
        } else {
       
        }
      });

  }

}
