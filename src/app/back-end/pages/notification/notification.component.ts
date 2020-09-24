import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/providers/notification.service';
import { Subscription, concat } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  // styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  class;
  editEmployee;
  editMode;

  Subscription: Subscription;
  loggedUsers;
  notifiList = [];
  
  constructor( private NotificationService: NotificationService ) { }

  ngOnInit() {
    this.Subscription = this.NotificationService.getRegistredUsers()
    .subscribe(users => { 
      console.log('users logid =>', users) 
      this.loggedUsers = users.LogeedUsers;
    })
  }

  checkToNotifi(fcm, userid) {
    const target = {fcm: fcm, userid: userid }
    let isTarget = this.notifiList.findIndex(s => { return s.userid == userid})    
    if (isTarget !== -1) {
      this.notifiList.splice(isTarget, 1);
    } else {
      this.notifiList.push(target);  
    }
    // console.log('target =>', target)
    // console.log('this.notifiList =>', this.notifiList)

  }

  onSendNotifi(notifi: NgForm) {
    console.log('notifi =>', notifi)

    if (this.notifiList.length > 0) {
      const data = {
        targetList: this.notifiList,
        title_ar: notifi.value.title_ar, 
        body_ar:  notifi.value.body_ar,
        title_en: notifi.value.title_en, 
        body_en:  notifi.value.body_en,
      };      
      this.NotificationService.sendNewNotifications(data)
      .subscribe( res => { 
        console.log(' sendNewNotifications ress => ', res)
       })
    }

  }



}
