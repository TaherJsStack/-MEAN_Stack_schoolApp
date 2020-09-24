const express    = require("express");
// const checkAuth  = require('../middleware/check-auth') ;
const payCtrl   = require('../controllers/payments');
const paymentRouter = express.Router();


paymentRouter.post("", payCtrl.savePay);

paymentRouter.get("", payCtrl.getAllPayments);

paymentRouter.get("/studentstPayBus", payCtrl.getAllStudentstPayBus);

paymentRouter.get("/payStatistics", payCtrl.payStatistics);

paymentRouter.get("/:id/searsh",  payCtrl.paySearch);

paymentRouter.put("/:id", payCtrl.updateOne);

module.exports = paymentRouter;