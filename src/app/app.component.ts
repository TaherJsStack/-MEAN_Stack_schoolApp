// tslint:disable-next-line:max-line-length
import { Component,
         OnInit,
         AfterViewInit,
         AfterViewChecked,
         OnChanges,
         DoCheck  } from '@angular/core';
import * as io from 'socket.io-client';
import { AuthService } from "angularx-social-login";
import { AuthSocialLoginService } from './providers/auth.social.login.service';
import { SettingsService } from './providers/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges, DoCheck  {


  socket;
  userData

  constructor(private authService: AuthService, 
              private AuthSocialLoginService: AuthSocialLoginService,
              private SettingsService: SettingsService) { }

  ngOnInit(): void { 
    if (localStorage.getItem('lang') == null) {
        this.SettingsService.setLang('lang', 'en')
    } else {
      this.SettingsService.setLang('lang', localStorage.getItem('lang'))
    }

    // this.authService.authState.subscribe( user => {
    //   console.log('authState.subscribe =>', user);
    //   this.userData = user
    // });

  }

   ngAfterViewInit() {
    // console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes): void {
   console.log('changes:->', changes);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {
    // console.log('ngDoCheck =>:');
  }



}




// <h1>
//   <a href="" class="typewrite" data-period="2000" data-type='[ "Hi, Im Si.", "I am Creative.", "I Love Design.", "I Love to Develop." ]'>
//     <span class="wrap"></span>
//   </a>
// </h1>


// var TxtType = function(el, toRotate, period) {
//   this.toRotate = toRotate;
//   this.el = el;
//   this.loopNum = 0;
//   this.period = parseInt(period, 10) || 2000;
//   this.txt = '';
//   this.tick();
//   this.isDeleting = false;
// };

// TxtType.prototype.tick = function() {
//   var i = this.loopNum % this.toRotate.length;
//   var fullTxt = this.toRotate[i];

//   if (this.isDeleting) {
//   this.txt = fullTxt.substring(0, this.txt.length - 1);
//   } else {
//   this.txt = fullTxt.substring(0, this.txt.length + 1);
//   }

//   this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

//   var that = this;
//   var delta = 200 - Math.random() * 100;

//   if (this.isDeleting) { delta /= 2; }

//   if (!this.isDeleting && this.txt === fullTxt) {
//   delta = this.period;
//   this.isDeleting = true;
//   } else if (this.isDeleting && this.txt === '') {
//   this.isDeleting = false;
//   this.loopNum++;
//   delta = 500;
//   }

//   setTimeout(function() {
//   that.tick();
//   }, delta);
// };

// window.onload = function() {
//   var elements = document.getElementsByClassName('typewrite');
//   for (var i=0; i<elements.length; i++) {
//       var toRotate = elements[i].getAttribute('data-type');
//       var period = elements[i].getAttribute('data-period');
//       if (toRotate) {
//         new TxtType(elements[i], JSON.parse(toRotate), period);
//       }
//   }
//   // INJECT CSS
//   var css = document.createElement("style");
//   css.type = "text/css";
//   css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
//   document.body.appendChild(css);
// };
