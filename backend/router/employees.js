const express    = require("express");
const multer     = require('multer');
const employeeCtrl   = require('../controllers/employees');
const employeeRouter = express.Router();
const extrctFile   = require('../middleware/file')
const checkAuth    = require('../middleware/check-auth');

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
      // cb(error, 'backend/images/employees')
      cb(error, 'images/employees')
  },
  filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIMIE_TYPE_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext);
  },
});


// employeeRouter.post("", employeeCtrl.saveGroupOfEmployee);
employeeRouter.post("", checkAuth, multer({ storage: storage }).single("imageUrl"), employeeCtrl.saveEmployee);

employeeRouter.get("",  employeeCtrl.getAllEmployees);

employeeRouter.put("/:id", multer({ storage: storage }).single("imageUrl"), employeeCtrl.updateOne);

employeeRouter.get("/:employeeEmail/emailSearsh",  employeeCtrl.findOneByEmail);

employeeRouter.get("/:workType/workTypeFillter",  employeeCtrl.workTypeFillter);

employeeRouter.put("/state/:id", employeeCtrl.updateOneState);

employeeRouter.delete("/:id", employeeCtrl.deleteOne);

module.exports = employeeRouter; 