const express    = require("express");
// const checkAuth  = require('../middleware/check-auth') ;
const textbookCtrl   = require('../controllers/textbook');
const textbookRouter = express.Router();


textbookRouter.post("", textbookCtrl.addTextbooks);

textbookRouter.get("",  textbookCtrl.getTextbooks);

textbookRouter.get("/class/:stage/:level/:term",  textbookCtrl.getClassTextbooks);

// textbookRouter.get("/:busId/busInfo",  busCtrl.getLineData);
// textbookRouter.get("/:levelId/classes",  busCtrl.getAllClasses);

module.exports = textbookRouter; 