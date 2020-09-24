import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {

  hoverSection: HTMLElement; 

  constructor() { }

  ngOnInit() {
    
    this.hoverSection = document.getElementById('hover');
    this.hoverSection.addEventListener('mousemove', onMouseEvent)}

  unsubscrib() {
    console.log('unsubscrib() =>')
    this.hoverSection.removeEventListener('mousemove', onMouseEvent)
  }


}

function onMouseEvent(ev: MouseEvent) {
  console.log('event => ', ev)
}
