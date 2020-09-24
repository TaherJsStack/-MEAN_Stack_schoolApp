import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AuthService } from 'src/app/providers/auth.service';
import { SettingsService } from 'src/app/providers/settings.service';
declare var $: any;

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  // styleUrls: ['./nav-top.component.scss']
})


export class NavTopComponent implements OnInit {


  textDir;
  marginDir;
  name;
  image;
  
  navigatorLanguage = navigator.language;

  constructor(
              private translate: TranslateService, 
              private AuthService: AuthService,
              private SettingsService: SettingsService) {
  }

  ngOnInit() {
    this.name  = localStorage.getItem('name');
    this.image = localStorage.getItem('imgUrl');
    console.log('localStorage.getItem', localStorage.getItem('lang'))

    this.marginDir = localStorage.getItem('lang');
    // localStorage.getItem('lang') == 'ar' ? this.textDir="rtl" : this.textDir="ltr";
    this.translate.use(localStorage.getItem('lang')); 
    this.SettingsService.getLangStorage().subscribe(data => {
      console.log('getLangStorage =>', data)
    })

  }

  changeLang(lang: string) {
    console.log('changeLang =>',lang)
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    this.marginDir = lang;
    this.SettingsService.setLang('lang', lang)
    // this.SettingsService.setLang.next(lang)
  }

  onLogOut() {
    this.AuthService.logout()
  }



}
