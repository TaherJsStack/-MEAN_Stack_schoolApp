import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/language/';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  // language
  // page direction
  // system color
  private setLanglocalStorage= new Subject<String>();

  
  // setLang = new BehaviorSubject<String>('en');
  // getLang = this.setLang.asObservable();

  constructor( private http: HttpClient ) { }

  getLangStorage(): Observable<any> {
    return this.setLanglocalStorage.asObservable();
  }

  setLang(key: string, data: any) {
    localStorage.setItem(key, data);
    this.setLanglocalStorage.next('changed');
  }

  removeLang(key) {
    localStorage.removeItem(key);
    this.setLanglocalStorage.next('changed');
  }

  // this.setLang.next(lang);



  // Inside Component

  // constructor(private storageService: StorageService  ){}
  // ngOnInit() {
  // this.storageService.watchStorage().subscribe((data:string) => {
  // // this will call whenever your localStorage data changes
  // // use localStorage code here and set your data here for ngFor
  // })


}
