import { AuthService } from './../../../providers/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSocialLoginService } from 'src/app/providers/auth.social.login.service';
// import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
// import { AuthService, GoogleLoginProvider } from 'angular5-social-login';

// import { AuthService } from "angularx-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // getHeight = $( window ).height();
  hide = true;
  errMsg;
  codeMsg;

  // private user = new BehaviorSubject<Boolean>(false);
  // cast = this.user.asObservable();


  constructor(  
                private AuthSocialLoginService: AuthSocialLoginService, 
                private authService: AuthService, 
                private Router: Router) { }

  ngOnInit() {
    console.log('================> LoginComponent <=======================')

    const authToken = localStorage.getItem('token');
    // console.log('authToken =>', authToken)
  }

  onCheckEmail(e) {
    console.log('onCheckEmail =>', e)
    this.authService.onCheckEmail(e)
    .subscribe( 
      s => { 
        // console.log('s =>', s)
        this.errMsg  = s.message;
        this.codeMsg = s.status;
      },
      e => { 
          // console.log('e =>', e.error.message)
          this.errMsg  = e.error.message;
          this.codeMsg = e.error.status;
        }
      )
  }

  onSignin(auth: NgForm) {
    if (!auth) {
      return;
    }
    const authSignin = {
      authEmail:    auth.value.authEmail,
      authPassword: auth.value.authPassword,
    };
    // console.log(auth, ' => auth');
 
    this.authService.login(authSignin);
    this.authService.cast.subscribe(
      s => { 
        // console.log('============>', s)
      },
      err => {
        // console.log('errMsg =>', err)
        this.errMsg = err
      })
  }

  onSignInWithFB() {
    this.AuthSocialLoginService.signInWithFB()
  }



}
