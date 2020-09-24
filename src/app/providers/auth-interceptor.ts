import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( 
    private authService: AuthService,
    private Router: Router
    ) {}

  intercept( req: HttpRequest<any>, next: HttpHandler  ) {
    // const authToken   = this.authService.getToken();
    const authToken = localStorage.getItem('token');
    if (authToken == null) {
      this.Router.navigate(['/backend'])
    } else {
      this.authService.isLogin.next(true)
    }
    
    // console.log('HttpRequest authToken=>', authToken);
    const authRequest = req.clone({
      headers: req.headers.set('authorization', 'Bearer ' + authToken)
    });
    return next.handle( authRequest );
  }
}
