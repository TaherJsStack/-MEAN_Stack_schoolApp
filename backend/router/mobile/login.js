const express    = require("express");
const loginCtrl   = require('../../controllers/mobile/login');
const mobileLoginRouter = express.Router();

mobileLoginRouter.post("", loginCtrl.mobileLogin);

mobileLoginRouter.post("/registerFCMToken", loginCtrl.registerFCMToken);

mobileLoginRouter.post("/getRegisteredFCMToken", loginCtrl.getRegisteredFCMToken);

mobileLoginRouter.get("/:email/checkEmail", loginCtrl.onCheckEmail);

mobileLoginRouter.get("/:studentId/getStudentById", loginCtrl.getStudent);

mobileLoginRouter.get("/:userId/getgetUserNotifications", loginCtrl.getUserNotifications);

mobileLoginRouter.get("/:studentId/getStudentAttend", loginCtrl.getStydentAttend);

module.exports = mobileLoginRouter; 