import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ParentsService } from 'src/app/providers/parents.service';
import { PageEvent } from '@angular/material';
import { BusService } from 'src/app/providers/bus.service';

@Component({
  selector: 'app-all-lines',
  templateUrl: './all-lines.component.html',
  // styleUrls: ['./all-lines.component.scss']
})
export class AllLinesComponent implements OnInit {

  buses;
  Subscription:  Subscription;
  
  isSpinner = true;

  totalData       = 0;
  dataPerPage     = 20;
  currentPageData = 1;
  dataPageSizeOptions = [20, 30, 35, 40];

  constructor( private BusService: BusService) {}

  ngOnInit() {

    this.BusService.getAllLines()
    this.Subscription = this.BusService.getAllLinesUpdatedListener()
    .subscribe( (linesData: {lines: any, postCount: number} )=> {
      console.log('getAllLines =>', linesData)
      this.totalData = linesData.postCount;
      this.buses   = linesData.lines;
      this.isSpinner = false;
    });

  }

  serchFillter(name) {
    console.log(name.length);
    if (name.length > 0) {
      this.Subscription = this.BusService.searchByAreaName(name)
      .subscribe( bus => {
        this.buses = [];
        console.log('serchFillter =>', bus.bus)
        this.buses   = bus.bus;
      });      
    } else {
      this.BusService.getAllLines()
    }
  }

 // mat paginator
  onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.currentPageData =  pageData.pageIndex + 1;
    this.dataPerPage =      pageData.pageSize;
    // this.parentsSrv.getAllParents(this.dataPerPage, this.currentPageData);
  }

  onDelete(id: string, name ) {
    if (confirm('Are you sure you want to delete ' + name  + '?') ) {
   }
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }


}
