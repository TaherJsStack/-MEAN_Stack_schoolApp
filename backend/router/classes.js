const express    = require("express");
// const checkAuth  = require('../middleware/check-auth') ;
const classCtrl   = require('../controllers/classes');
const classRouter = express.Router();


classRouter.post("", classCtrl.saveClass);

classRouter.get("/stages",  classCtrl.getAllStages);

classRouter.post("/textbook",  classCtrl.addTextbooks);

// classRouter.post("/examesDegree",  classCtrl.addExamesDegree);

classRouter.get("/:classId/classInfo",  classCtrl.getClassInfo);

classRouter.get("/:levelId/classes",  classCtrl.getAllClasses);

// classRouter.get("/:levelId/JoinStudents",  classCtrl.getAllClassesJoinStudents);

classRouter.get("/JoinStudents2",  classCtrl.getAllchildesParentAggregate);

module.exports = classRouter; 