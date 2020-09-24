import { Observable, Subscription, Subject } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthSocialLoginService } from './auth.social.login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  subscription: Subscription;

  constructor( 
    private AuthSocialLoginService: AuthSocialLoginService,
    private authService: AuthService, 
    private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {

      let isActiveAuth;

      // get status from auth service
      this.subscription = this.authService.cast.subscribe(result => 
        {
          // console.log('AuthGuard =====>', result)
          isActiveAuth = result;
          const authToken = localStorage.getItem('token');
          if (authToken && authToken != null) {
            isActiveAuth = true,
            this.authService.isLogin.next(true)
          } 
        })

        // get status from auth Auth Social Login Service
      this.subscription = this.AuthSocialLoginService.cast.subscribe(result => { 
        // console.log('AuthGuard =====>', result)
          isActiveAuth = result;
          const authToken = localStorage.getItem('token');
          if (authToken && authToken != null) {
            isActiveAuth = true,
            this.authService.isLogin.next(true)
          } 
        })
        // console.log('AuthGuard isActiveAuth =====>', isActiveAuth)

      return isActiveAuth;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
  


}
