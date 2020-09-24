const express    = require("express");
// const checkAuth  = require('../middleware/check-auth') ;
const busCtrl   = require('../controllers/bus');
const busRouter = express.Router();




busRouter.post("", busCtrl.saveBus);

busRouter.get("",  busCtrl.getAllLines);

busRouter.get("/:busId/busInfo",  busCtrl.getLineData);

busRouter.get("/:areaName/searshByAreaname",  busCtrl.searshByAreaname);


// busRouter.get("/:levelId/classes",  busCtrl.getAllClasses);

module.exports = busRouter; 