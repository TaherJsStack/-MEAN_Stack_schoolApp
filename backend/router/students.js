const express    = require("express");
const multer     = require('multer');
const checkAuth  = require('../middleware/check-auth');
const studentCtrl   = require('../controllers/students');
const studentRouter = express.Router();
const extrctFile    = require('../middleware/file')

const MIMIE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const isValid = MIMIE_TYPE_MAP[file.mimetype];
      let error = new Error('Invalid mime Type');
      if (isValid) {
          error = null;
      }
      // cb(error, 'backend/images/students')
      cb(error, 'images/students')
  },
  filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIMIE_TYPE_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext);
  },
});

studentRouter.post("", checkAuth, multer({ storage: storage }).single("imageUrl"), studentCtrl.saveStudent);

studentRouter.get("",  studentCtrl.getAllStudents);

studentRouter.get("/getStudentsPayBus",  studentCtrl.getStudentsPayBus);

studentRouter.get("/:phoneNo/seartch",  studentCtrl.studentSearch);

studentRouter.get("/:id/studentSearchById",  studentCtrl.studentSearchById);

studentRouter.get("/:studentEmail/emailSearsh",  studentCtrl.findOneByEmail);

// studentRouter.get("/:educatioStage/stageFillter",  studentCtrl.educationalStageFillter);
studentRouter.get("/stageFillter",  studentCtrl.educationalStageFillter);

studentRouter.get("/:stage/:level/studentsFillterStageLevel",  studentCtrl.studentsFillterStageAndLevel);

studentRouter.put("/:id", multer({ storage: storage }).single("imageUrl"), studentCtrl.updateOne);

studentRouter.put("/state/:id", studentCtrl.updateOneState);

studentRouter.get("/studentsChart",  studentCtrl.studentsChart);

studentRouter.get("/student/:id",  studentCtrl.getStudent);

studentRouter.delete("/:id/:parentEmail/:parentPhone", studentCtrl.deleteOne);


module.exports = studentRouter; 