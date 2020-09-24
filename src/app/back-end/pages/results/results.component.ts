import { ExamesService } from 'src/app/providers/exames.service';
import { Subscription } from 'rxjs';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ClassesService } from 'src/app/providers/classes.service';
import { TextbookService } from 'src/app/providers/textbook.service';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';


export interface PeriodicElement {
  index: any,
  name: string;
  id: number;
  degree: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
})
export class ResultsComponent implements OnInit {

  exames;
  stage;
  level;
  className;
  term;
  month;
  textBook;
  isWarningAlert = false;
  isResultspinner = false;
  isClassNameSpinner = false;
  stages = [];
  leveles = []; 
  classTextbooks=[];
  terms = ['first term', 'second term'];
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July",    "August",   "September", "October", "November", "December"];

  classesData;

  Subscription:  Subscription;

  displayedColumns: string[] = ['index', 'id', 'name', 'degree'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor( private ClassesService: ClassesService, private ExamesService: ExamesService, private TextbookService: TextbookService ) { }

  ngOnInit( ) {

    this.ExamesService.getExame()
    .subscribe(exames => {
      console.log('ExamesService =>', exames)
      this.exames = exames.exames;
    })

    this.dataSource.paginator = this.paginator;
    this.ClassesService.getAllStages();
    this.Subscription = this.ClassesService.getAllStagesUpdatedListener()
    .subscribe( ( stages: {stages: any} )=> {
      console.log(' classes studentstData =>',  stages)
      this.stages  =  stages.stages;
      console.log('this.stages =>', this.stages)
    });
  }

  onSelectStage(stageName) {
    console.log('stageName =>', stageName);
    this.stage = stageName;
    this.stages.filter( stages => { return stages.stageName === stageName } )
    .forEach(element => {
      this.leveles = element.leveles; 
    });

    if (this.stage && this.level && this.className && this.term && this.month && this.textBook) {
      this.isResultspinner = true;
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.getExameResult(this.stage, this.level, this.className, this.term, this.month, this.textBook)
    }

  }

  // get Level Classes
  onSelectLevel(id, levelName) {
    this.level = levelName;
    this.isClassNameSpinner = true;

    this.ClassesService.getLevelClasses(id);
    this.Subscription = this.ClassesService.getLevelClassesUpdatedListener()
    .subscribe( ( classes: {classes: any} )=> {
      console.log('classesData =>', classes.classes)
      this.classesData = classes.classes;
      this.isClassNameSpinner = false;
    });

    if (this.stage && this.level && this.className && this.term && this.month && this.textBook) {
      this.isResultspinner = true;
      this.dataSource  = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.getExameResult(this.stage, this.level, this.className, this.term, this.month, this.textBook)
    }
  }
  
  levelChange(e) {
    if (this.stage && this.level && this.className && this.term && this.month && this.textBook) {
      this.isResultspinner = true;
      this.dataSource  = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.getExameResult(this.stage, this.level, this.className, this.term, this.month, this.textBook)
    }
  }

  onSelectClassname(className) {
    console.log('class name =>', className)
    this.className = className;

    if (this.stage && this.level && this.className && this.term && this.month && this.textBook) {
      this.isResultspinner = true;
      this.dataSource  = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.getExameResult(this.stage, this.level, this.className, this.term, this.month, this.textBook)
    }
  }

  onSelectTerm(term) {
    console.log('term =>', term)
    this.term = term;
    this.TextbookService.getClassTextbooks(this.stage, this.level, term)
    .subscribe(
      textbooks => {
        console.log('textbooks =>', textbooks.textBooks.termTextbooks)
        this.classTextbooks = textbooks.textBooks.termTextbooks
      }
    )

    if (this.stage && this.level && this.className && this.term && this.month && this.textBook) {
      this.isResultspinner = true;
      this.dataSource  = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.getExameResult(this.stage, this.level, this.className, this.term, this.month, this.textBook)
    }
  }
  
  onSelectMonth(month) {
    console.log('month =>', month)
    this.month = month;
    // this.classTextbooks = [];

    if (this.stage && this.level && this.className && this.term && this.month && this.textBook) {
      this.isResultspinner = true;
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.getExameResult(this.stage, this.level, this.className, this.term, this.month, this.textBook)
    }
  }

  onSelectTextbook(textbook) {
    this.textBook = textbook;

    if (this.stage && this.level && this.className && this.term && this.month && this.textBook) {
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.getExameResult(this.stage, this.level, this.className, this.term, this.month, this.textBook)
    }
  }

  getExameResult(stage, level, className, term, month, textbook) {
    this.ExamesService.getAllTextbookExamResult(stage, level, className, term, month, textbook)
    .subscribe(
      exameResult => {
        console.log('exameResult =>', exameResult);
        if (exameResult.exameResults == null) {
          console.log('exameResult.exameResults.studentsDegree =>')
          this.isWarningAlert = true;
          this.isResultspinner = false;
        } else {
          this.isWarningAlert = false;
          this.isResultspinner = false;
          return this.dataSource = new MatTableDataSource<PeriodicElement>(exameResult.exameResults.studentsDegree)          
        }
      },
      err => {console.log('exameResult =>', err)},
      )
  }


  OnDestroy() { 
    this.Subscription.unsubscribe()
  }

}
