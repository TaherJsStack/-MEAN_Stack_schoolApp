// import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../providers/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Injector } from '@angular/core';
import { SettingsService } from '../providers/settings.service';

declare var $: any;

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  // styleUrls: ['./backend.component.scss']
})
export class BackendComponent implements OnInit {

  textDir;
  isDrawer: boolean = true;
  // private isLoggedIn;
  isLoggedIn: Boolean = false;
  subscription: Subscription;
  getHeight = $(window).height() - 45;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private injector: Injector,
    private SettingsService: SettingsService) { }

  ngOnInit() {

    localStorage.getItem('lang') == 'ar' ? this.textDir = "rtl" : this.textDir = "ltr";
    this.SettingsService.getLangStorage().subscribe(langIs => {
      console.log('langIs//////////////////////////////////////////////  =>', langIs)
      if (localStorage.getItem('lang') == 'ar') {
        this.textDir = "rtl"
      } else {
        this.textDir = "ltr"
      }
    })

    // const authToken = localStorage.getItem('token');
    // console.log('authToken =>', authToken)

    // console.log('getHeight =>', this.getHeight)

    this.subscription = this.authService.onLogin()
      .subscribe(isLogged => {
        // console.log('isLogin =>>>', isLogged)
        this.isLoggedIn = isLogged;
        // this.router.navigate(['/backend/dashboard'])
        const authToken = localStorage.getItem('token');
        // console.log('authToken =>', authToken)
        if (authToken && authToken != null) {
          // this.authService.user.next(true)
          this.isLoggedIn = true;
          // this.forceRunAuthGuard();
        } else {
          if (isLogged) {
            this.isLoggedIn = isLogged;
            this.router.navigate(['/backend/dashboard'])
            // console.log('*********** BackendComponent login true ********************')
          } else {
            this.router.navigate(['/backend'])
            // console.log('***********  BackendComponent => login false ********************')
          }
        }


      })


    this.subscription = this.authService.onLogout()
      .subscribe(isLogout => {
        // console.log('isLogout =>>>', isLogout)
        this.isLoggedIn = false;
      })



    // this.subscription = this.authService.cast.subscribe(isLogged => {
    //   console.log('BackendComponent =>', isLogged);
    //   this.isLoggedIn = false;

    //   const authToken = localStorage.getItem('token');
    //   console.log('authToken =>', authToken)

    //   if (authToken && authToken != null) {
    //     // this.authService.user.next(true)
    //     this.isLoggedIn = true;
    //     this.forceRunAuthGuard();
    //   } else {
    //     if (isLogged) {
    //       this.isLoggedIn = isLogged;
    //       this.router.navigate(['/backend/dashboard'])
    //       console.log('*********** BackendComponent login true ********************')
    //     } else {
    //       this.router.navigate(['/backend'])
    //       console.log('***********  BackendComponent => login false ********************')
    //     }
    //   }
    // })
  }



  // Dirty hack for angular2 routing recheck
  private forceRunAuthGuard() {
    if (this.route.root.children.length) {
      // gets current route
      const curr_route = this.route.root.children['0'];
      // gets first guard class
      const AuthGuard = curr_route.snapshot.routeConfig.canActivate['0'];
      // injects guard
      const authGuard = this.injector.get(AuthGuard);
      // makes custom RouterStateSnapshot object
      const routerStateSnapshot: RouterStateSnapshot = Object.assign({}, curr_route.snapshot, { url: this.router.url });
      // runs canActivate
      authGuard.canActivate(curr_route.snapshot, routerStateSnapshot);
    }
  }

  drawerToggle(e) {

    this.isDrawer == true ? this.isDrawer = false : this.isDrawer = true;
    // }
    console.log('this.isDrawer =>>>>>>>', this.isDrawer)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }


}
