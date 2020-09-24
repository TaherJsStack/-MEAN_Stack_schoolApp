const express    = require("express");
// const checkAuth  = require('../middleware/check-auth') ;
const attendCtrl   = require('../controllers/attendes');
const attendRouter = express.Router();

attendRouter.post("/addClassAttend", attendCtrl.saveClassAttend);

attendRouter.post("/addBusAttend", attendCtrl.saveBusAttend);

attendRouter.get("",  attendCtrl.getAllAttendes);

attendRouter.get("/:month/getClassAttendes",  attendCtrl.getClassDayesAttend);

attendRouter.get("/:month/getBusAttendes",  attendCtrl.getBUsDayesAttend);

attendRouter.get("/getClassfillters",  attendCtrl.getClassfillters);

module.exports = attendRouter; 