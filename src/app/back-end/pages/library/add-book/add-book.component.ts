import { LibraryService } from './../../../../providers/library.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { mimeType } from 'src/app/mime-type.validator';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  // styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  editTeacher;

  subjects = [
    { name: 'Mathematics'},
    { name: 'Science'},
    { name: 'Handwriting'},
    { name: 'Physical Education (P.E.)'},
    { name: 'Art'},
    { name: 'Music'},
    { name: 'Dance'},
    { name: 'Sports'},
  ]
  books = [];
  librarySub:  Subscription;
  bookForm;
  // bookForm: FormGroup;
  imgReview: string;
  editMode;
  bookID;
 
  totalData       = 0;
  dataPerPage     = 10;
  currentPageData = 1;
  dataPageSizeOptions = [10, 20, 30, 40];

  constructor(  private librarySrv: LibraryService,
                private route: ActivatedRoute,
                private _flashMessagesService: FlashMessagesService) { }
                
  ngOnInit() {

    this.librarySrv.getAllLibrary( this.dataPerPage, this.currentPageData);
    this.librarySub = this. librarySrv.getAllLibraryUpdatedListener()
    .subscribe( ( library: {library: any, postCount: number} )=> {
      this.totalData = library.postCount;
      this.books           = library.library;
      console.log(' this.currentPageData data =>',  this.currentPageData)
    });

    this.bookForm = new FormGroup ({
      title:        new FormControl(null, Validators.required),
      subject:      new FormControl(null, Validators.required),
      bookAuth:     new FormControl(null, Validators.required),
      description:  new FormControl(null, Validators.required),
      image:        new FormControl(null,
        {validators: [
          Validators.required],
          asyncValidators: [mimeType]
        }),
      // book:      new FormControl(null,
      //   {validators: [
      //     Validators.required],
      //     asyncValidators: [mimeType]
      //   }
      //   ),
    })
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.bookForm.patchValue({image: file});
    this.bookForm.get('image').updateValueAndValidity();
    console.log(file);
    // console.log(this.employeeForm);
    // to create prview
    const reader = new FileReader();
    reader.onload = () => {
      this.imgReview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  
  // onBokPDfPicked(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.bookForm.patchValue({file: file});
  //   this.bookForm.get('book').updateValueAndValidity();
  //   console.log(file);
  //   console.log(this.bookForm);
   
  // }

   // mat paginator
  
   onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.currentPageData =  pageData.pageIndex + 1;
    this.dataPerPage =      pageData.pageSize;
    this.librarySrv.getAllLibrary(this.dataPerPage, this.currentPageData);
  }

  onSave() {
    if (this.bookForm.invalid ) {
      return;
    }
    console.log('onSave book =>', this.bookForm )
    const bookData = new FormData();
    bookData.append('imageUrl',    this.bookForm.value.image);
    bookData.append('title',       this.bookForm.value.title);
    bookData.append('bookAuth',    this.bookForm.value.bookAuth);
    bookData.append('subject',     this.bookForm.value.subject);
    bookData.append('description', this.bookForm.value.description);
    bookData.append('created_at',  new Date().toISOString());
    bookData.append('creator',     '2222222');

    if (this.editMode) {
      this.librarySrv.updateBook(this.bookID, bookData)
      .subscribe(
        msg => {
          this.librarySrv.getAllLibrary(this.dataPerPage, this.currentPageData);
          this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
        },
        err => {
          console.log('err.error=>', err.error.message);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
    } else {
      this.librarySrv.addBook(bookData)
        .subscribe(
          msg => {
            this.librarySrv.getAllLibrary(this.dataPerPage, this.currentPageData);
            this._flashMessagesService.show( msg.message  ,{ cssClass: 'alert-success flash-message', timeout: 4000 });
          },
          err => {
            this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
          });
    }
    this.editMode = false;
    this.bookForm.reset();
    this.imgReview = null;
    this.librarySrv.getAllLibrary(this.dataPerPage, this.currentPageData);

  }



}
