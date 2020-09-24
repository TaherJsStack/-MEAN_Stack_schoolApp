   // Notifications.js

const FCM = require('fcm-node');
const serverKey = 'AAAA7dk4nak:APA91bEVhSHALq61PAellJwz1a61ADjPOW-YvJm79vjhvLjRizw0d3kf-G2Y6BGse3bgi5Wug6ZocbBlnotFVl8OHm-ZBylDxMvfYXQm-JCDyaZpL6oV1-3AxRDoPiAS4gO4eP8pMBW4'; // put your server key here
const fcm = new FCM(serverKey);
const Notifications = require('../models/notifications');
const LogeedUser  = require('../models/mobile/logeedUsers')

// all Loged Users
exports.getAllLogeedUser = (req, res, next) => {
  LogeedUser.find()
  .then(documents => {
    // console.log('documents =>' , documents)
    res.status(200).json({
      message: "Loged User fetched successfully!",
      LogeedUsers: documents,
      status: 200
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + 'LogedUser fetched error:::: DB',
      status: 500
    });
  });
}

exports.sendNewNotifications = (req, res, next) => {
console.log('req.body =================?', req.body)
  var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  // registration_ids: ['registration_tokens'], // Multiple tokens in an array
    to: req.body.targetList[0].fcm,   // only on token
    collapse_key: 'AIzaSyCqWqZYD_cNZnRrU7hsHx1r6VI-ZU_jid8',
    notification: {
      title: 'Title of your push notification', 
      body: 'Body of your push notification' 
    },
    data: {  //you can send only notification or only data(or include both)
      my_key: 'my value',
      my_another_key: 'my another value'
    }
  };

fcm.send(message, function(err, response){
    if (err) {
        console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
      const notifiData = new Notifications({
        userId: req.body.targetList[0].userid,
        notification: {
          title_ar: req.body.title_ar, 
          body_ar:  req.body.body_ar,
          title_en: req.body.title_en, 
          body_en:  req.body.body_en,
        },
      })
      notifiData.save()
      .then(saved => {
        console.log('notifiData.save saved=>', saved)
        res.status(200).json({
          message: "notification send and seved successfully!",
          fcmResponse: response,
          status: 200
        });
      })
      .catch( err => {
        console.log('notifiData.save err=>', err)
      })
        
    }
});




}



