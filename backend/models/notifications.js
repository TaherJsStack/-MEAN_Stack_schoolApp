const mongoose = require('mongoose');

const NotificationsSchema = new mongoose.Schema({
  userId:  { type: String },
  isOpened: { type: Boolean, default: false },
  notification: {
    title_ar: { type: String}, 
    body_ar:  { type: String},
    title_en: { type: String}, 
    body_en:  { type: String},
  },
  data: {  //you can send only notification or only data(or include both)
    my_key:         { type: String},
    my_another_key: { type: String},
  },
  creator:    { type: String, default: 'creator'},
  created_at: { type: Date, default: new Date() },
});

module.exports = mongoose.model('Notifications', NotificationsSchema);
