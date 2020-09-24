import { Observable, Subscription, Subject } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthNot implements CanActivate {


  subscription: Subscription;

  constructor( 
    private authService: AuthService, 
    private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {

      let isActiveAuth = true;
      const authToken = localStorage.getItem('token');
      console.log('authToken =>', authToken)
  
      if (authToken && authToken != null) {
        isActiveAuth = false;
        this.router.navigate(['/backend/dashboard'])
      }

      return isActiveAuth;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
  


}
