import { HttpClient }      from '@angular/common/http';
import { Injectable, OnInit }      from '@angular/core';
import { Router }          from '@angular/router';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import { environment } from '../../environments/environment';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
const BACKEND_API = environment.API_URL + '/auth/';

@Injectable({ providedIn: 'root' })

export class AuthSocialLoginService {

  isLogin = new Subject();
  subscription: Subscription

  userData = new BehaviorSubject<any>([]);
  data = this.userData.asObservable();
  
  user = new BehaviorSubject<Boolean>(false);
  cast = this.user.asObservable();

  constructor(
              private authService: AuthService, 
              private router: Router,
              private http: HttpClient
              ) { }         
    
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then( data => {
        this.userData.next(data)

        console.log('d ===>', data)
        const fb = {
          id:        data.id,
          name:      data.name,
          email:     data.email,
          photoUrl:  data.photoUrl,
          firstName: data.firstName,
          lastName:  data.lastName,
          authToken: data.authToken,
          facebook:  data.facebook,
          provider:  data.provider,
        }
        return this.http.post<{user: any, message: any, id: string, authToken: string }>(BACKEND_API + 'SocialLogin', fb )
          .subscribe( 
            s => { 
              console.log('SocialLogin s ', s)
              this.saveAuthData(s.id, s.user.name, s.user.photoUrl, s.authToken) 
              this.user.next(true);
            },
            e => { console.log('SocialLogin e ', e) }
            );
      
      });
  }


  // socialSignIn(socialPlatform : string) {
  //   console.log('socialPlatform =>', socialPlatform)
  //   let socialPlatformProvider;
  //   if(socialPlatform == "facebook"){
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   }else if(socialPlatform == "google"){
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   } else if (socialPlatform == "linkedin") {
  //     socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
  //   } else if (socialPlatform == "vkontakte") {
  //     socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
  //   }
    
  //   this.socialAuthService.signIn(socialPlatformProvider).then(
  //     (userData) => {
  //       console.log(socialPlatform+" sign in data : " , userData);
  //       // Now sign-in with userData
  //       // ...
            
  //     }
  //   );
  // }

  onLogin() {
    return this.isLogin.asObservable();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      // this.user = user;
      // this.loggedIn = (user != null);
      console.log('authState.subscribe =>', user);
    });
  }

  private saveAuthData(userId: string, name, imgUrl, token: string) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('name',   name);
    localStorage.setItem('imgUrl', imgUrl);
    localStorage.setItem('token',  token);
  }


}
