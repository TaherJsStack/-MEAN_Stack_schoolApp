import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { AuthSocialLoginService } from 'src/app/providers/auth.social.login.service';
import { SettingsService } from 'src/app/providers/settings.service';
// import { AuthService } from "angularx-social-login";
// import { AuthSocialLoginService } from '../../providers/auth.social.login.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent implements OnInit {

  textDir: String = 'en';
  userData;
  name;
  image;

  constructor( 
        private AuthService: AuthService, 
        private authService: AuthService,
        private AuthSocialLoginService: AuthSocialLoginService,
        private SettingsService: SettingsService) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.image = localStorage.getItem('imgUrl');
    this.AuthSocialLoginService.data.subscribe( d => this.userData = d);
    // this.SettingsService.getLang.subscribe( langIs => { 
    //   console.log(' SettingsService.getLang =>', langIs)
    //   this.textDir = langIs;
    //   console.log(' this.textDir =>', this.textDir)
    // })
    this.textDir = localStorage.getItem('lang');
    this.SettingsService.getLangStorage().subscribe(data => {
      console.log('getLangStorage =>', data)
      this.textDir = localStorage.getItem('lang');
    })
  }

  onLogOut() {
    this.AuthService.logout()
  }

}
