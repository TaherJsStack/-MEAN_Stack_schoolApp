const express    = require("express");
// const checkAuth  = require('../middleware/check-auth') ;
const notifiCtrl   = require('../controllers/notification');
const notifiRouter = express.Router();

// notifiRouter.post("", busCtrl.saveBus);

notifiRouter.get("/registered",  notifiCtrl.getAllLogeedUser);

notifiRouter.post("/sendNotifi",  notifiCtrl.sendNewNotifications);

// Notifications
// notifiRouter.get("/:busId/busInfo",  busCtrl.getLineData);
// busRouter.get("/:levelId/classes",  busCtrl.getAllClasses);

module.exports = notifiRouter; //notification