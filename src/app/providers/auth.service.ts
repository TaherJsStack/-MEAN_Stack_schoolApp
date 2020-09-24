import { HttpClient }      from '@angular/common/http';
import { Injectable }      from '@angular/core';
import { Router }          from '@angular/router';
import { Subject, Subscription, Observable, BehaviorSubject } from 'rxjs';
// import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/auth/';

@Injectable({ providedIn: 'root' })

export class AuthService {

  user = new BehaviorSubject<Boolean>(false);
  cast = this.user.asObservable();
  token;
  Subscription: Subscription;
  getErrorMsg = new Subject<string>();
  isLogout = new Subject<boolean>();
  isLogin = new Subject<boolean>();

  constructor(private router: Router,
              private http: HttpClient
              ) {}         

  // add new auth
  addNewAuth(authData) {
    console.log(' auth data =>', authData)
    return this.http.post<{ message: any }>(BACKEND_API, authData );
  }

  getErrMsg() {
    return this.getErrorMsg.asObservable();
  }

  onLogout() {
    return this.isLogout.asObservable();
  }

  onLogin() {
    return this.isLogin.asObservable();
  }

  onCheckEmail(email) {
    return this.http.get<{ message: string, status: any }>(BACKEND_API + 'checkEmail/' + email )
  }

  login(authData) {
    this.http.post<{ token: string, message: string, expiresIn: number, authId: string, roll: string, name: string, image: string }>(BACKEND_API + '/login', authData )
    .subscribe( result => {
             this.user.next(true);
             this.isLogin.next(true)

            const token = result.token;
            const roll  = result.roll;
            this.token  = result.token;
            console.log('user name => ', result.name);
            console.log('user image => ', result.image);
            console.log('user => ', result.authId);
            console.log('roll => ', roll);
            console.log('message => ', result.message);
            if (token && (roll === 'root' || 'Administrative')) {
              const expiresInDuration = result.expiresIn;
              const now = new Date();
              const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
              console.log(expirationDate);
              this.saveAuthData(result.authId, token, expirationDate, result.name, result.image);
            }
          },
          err => {
            console.log('err ::=>', err.error.message);
            this.getErrorMsg.next(err.error.message);
          });
  }

  private saveAuthData(userId: string, token: string, expirationDate: Date, name, imgUrl) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('name',   name);
    localStorage.setItem('imgUrl', imgUrl);
  }

  getSocialAuth() {
    return this.http.get<{ message: string, status: any, authors: any }>(BACKEND_API + 'getSocialAuth/' )
  }
  
  getAuthors() {
    return this.http.get<{ message: string, status: any, authors: any }>(BACKEND_API + 'getAuthors/' )
  }

  getAuthInfo(id) {
    return this.http.get<{ message: string, status: any, auth: any }>(BACKEND_API + 'getAuthInfo/' + id )

  }

  logout() {
    this.token = null;
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('name');
    localStorage.removeItem('imgUrl');
    this.user.next(false);
    this.isLogout.next(false)
    this.router.navigate(['/backend'])

  }


}
