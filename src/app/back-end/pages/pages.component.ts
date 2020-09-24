import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/providers/settings.service';
declare var $: any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  textDir;
  pathname;
  parts;
  getHeight = $(window).height() - 45;

  constructor( private SettingsService: SettingsService) { }

  ngOnInit() { 
    // console.log('window.location.href =>', window.location.href)
    // this.SettingsService.getLang.subscribe( langIs => { 
    //   console.log(' SettingsService.getLang =>', langIs)
    //     this.textDir = langIs
    // })
    this.textDir = localStorage.getItem('lang')
    this.SettingsService.getLangStorage().subscribe(data => {
      console.log('getLangStorage =>', data)
      this.textDir = localStorage.getItem('lang')
    })

  }

  ngDoCheck()	{
    // console.log(' ngDoCheck window.location.href =>', window.location.href)
    // console.log(' ngDoCheck window.location.href =>', window.location.pathname)
    this.pathname = window.location.pathname;

    this.parts = window.location.pathname.split( '/' );
    // console.log(' ===========>', this.parts)
  }


}
