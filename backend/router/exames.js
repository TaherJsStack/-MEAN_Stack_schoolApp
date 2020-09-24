const express    = require("express");
// const checkAuth  = require('../middleware/check-auth') ;
const examesCtrl   = require('../controllers/exames');
const examesRouter = express.Router();

// examesDegree
examesRouter.post("", examesCtrl.saveExamesDegree);

examesRouter.get("",  examesCtrl.getAllExames);

examesRouter.get("/examResult",  examesCtrl.getAllTextbookExamResult);


examesRouter.get("/addStudentsResult",  examesCtrl.addStudentsResult);



// examesRouter.get("/class/:stage/:level/:term",  examesCtrl.getClassTextbooks);

// examesRouter.get("/:busId/busInfo",  busCtrl.getLineData);
// examesRouter.get("/:levelId/classes",  busCtrl.getAllClasses);

module.exports = examesRouter; 