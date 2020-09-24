const express    = require("express");
const multer     = require('multer');
// const checkAuth  = require('../middleware/check-auth') ;
const teacherCtrl   = require('../controllers/teachers');
const teacherRouter = express.Router();
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
      // cb(error, 'backend/images/teachers')
      cb(error, 'images/teachers')
  },
  filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIMIE_TYPE_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext);
  },
});

// teacherRouter.post("", teacherCtrl.saveGroupOfTeachers);
teacherRouter.post("", multer({ storage: storage }).single("imageUrl"), teacherCtrl.saveTeacher);

teacherRouter.get("",  teacherCtrl.getAllTeachers);

teacherRouter.put("/:id", multer({ storage: storage }).single("imageUrl"), teacherCtrl.updateOne);

teacherRouter.get("/:teacherEmail/emailSearsh",  teacherCtrl.findOneByEmail);

teacherRouter.get("/teatcherByStage/:stage",  teacherCtrl.teatcherByStage);

teacherRouter.get("/stageFillter",  teacherCtrl.educationalStageFillter);

teacherRouter.put("/state/:id", teacherCtrl.updateOneState);

teacherRouter.delete("/:id", teacherCtrl.deleteOne);

module.exports = teacherRouter;