import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'node_modules/rxjs';
import { PageEvent } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ParentsService } from 'src/app/providers/parents.service';
import { SettingsService } from 'src/app/providers/settings.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  // styleUrls: ['./parents.component.scss']
})
export class AllParentsComponent implements OnInit {

  marginDir;
  textDir;
  parents;
  OneParent;
  parentsSub:  Subscription;
  
  isSpinner = true;

  totalData       = 0;
  dataPerPage     = 5;
  currentPageData = 1;
  dataPageSizeOptions = [5, 15, 25, 30, 50, 100];

  constructor( private parentsSrv: ParentsService,
               private _flashMessagesService: FlashMessagesService,
               private SettingsService: SettingsService,
               private translate: TranslateService) {}
               

  ngOnInit() {

    this.textDir = localStorage.getItem('lang');
    this.translate.use(localStorage.getItem('lang'));

    this.SettingsService.getLangStorage().subscribe(data => {
      this.textDir = localStorage.getItem('lang');
      this.translate.use(localStorage.getItem('lang')); 
      console.log('getLangStorage =>', data)
      console.log('textDir =>', this.textDir)
    })

    this.parentsSrv.getAllParents( this.dataPerPage, this.currentPageData);
    this.parentsSub = this.parentsSrv.getAllParentsUpdatedListener()
    .subscribe( (parentstData: {parents: any, postCount: number} )=> {
      console.log('parentstData =>', parentstData)
      this.totalData  = parentstData.postCount;
      this.parents    = parentstData.parents;
      this.isSpinner  = false;
    });

    // get All parents from services
    // this.parentsSrv.getAllParents(this.catsPerPage, this.catsCurrentPage);
    // console.log('getAllParents =>', this.parents)
    // this.parentsSub = this.parentsSrv.getAllParentsUpdatedListener()
    // .subscribe( (productData)=> {
    //   console.log('this.productsSub => ', productData)
    //   this.parents = productData; 
    // });
  }

  getChildesCount(parentEmail, parentPhone) {
    // this.parentsSrv.getParentChilds(parentEmail, parentPhone)
    //   .subscribe( childes => {
    //     // return childes.childes.count
    //     console.log('childes.childes =>', childes.childes.length)

    //   });
  }

  serchFillter(email) {
    if (email.length > 0) {
      console.log('======================================' ,email);
      this.parentsSub = this.parentsSrv.searchFindOne(email)
      .subscribe( 
          parent => {
            console.log('parentstData =>', parent)
            if (parent.parents.length == 0) {
              this.parentsSrv.getAllParents( this.dataPerPage, this.currentPageData);
            } else {
              this.parents = parent.parents;
            }
          },
        err => console.log('======>', err)
      );      
    }

  }

 // mat paginator
  onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.currentPageData =  pageData.pageIndex + 1;
    this.dataPerPage =      pageData.pageSize;
    this.parentsSrv.getAllParents(this.dataPerPage, this.currentPageData);
  }

  changeProState(proID, event) {
    const prodState = {
      id:          proID.toString(),
      showProduct: event.checked.toString(),
    };
    if (confirm('Are you sure ' +  event.checked + ' ?') ) {
      // this.proService.updateProState(proID, prodState).subscribe(
      //   msg => {
      //     this.proService.getAllProducts(this.dataPerPage, this.currentPageData);
      //     this._flashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
      //   },
      //   err => {
      //     console.log('err.error=>', err.error.message);
      //     this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
      //   });
    }
  }

  onDelete(id: string, name, email, phone ) {
    if (confirm('Are you sure you want to delete ' + name  + '?') ) {
      this.parentsSrv.deleteParent(email, phone, id)
      .subscribe( msg => {
        this.parentsSrv.getAllParents(this.dataPerPage, this.currentPageData);
        this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
      });
   }
  }

  ngOnDestroy() {
    // this.productsSub.unsubscribe();
  }

}
