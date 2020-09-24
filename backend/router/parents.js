const express       = require("express");
const multer        = require('multer');
const checkAuth     = require('../middleware/check-auth');
const extrctFile    = require('../middleware/file')
const parentCtrl    = require('../controllers/parents');
const parentsRouter = express.Router();

const MIMIE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIMIE_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime Type");
    if (isValid) {
      error = null;
    }
    // cb(error, 'backend/images/parents')
    cb(error, "images/parents");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIMIE_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

// parentsRouter.post("", parentCtrl.addGroupOfParent);
parentsRouter.post("", checkAuth, multer({storage: storage}).single('image'), parentCtrl.saveParent);

parentsRouter.get("",  parentCtrl.getAllParents);

parentsRouter.get("/:parentEmail/:parentPhone/childes",  parentCtrl.getParentChildes);

parentsRouter.get("/:parentId/searshById",  parentCtrl.findOneById);

parentsRouter.get("/:parentEmail/searshByEmail",  parentCtrl.findOneByEmail);

parentsRouter.put("/:id", multer({storage: storage}).single('image'), parentCtrl.updateOne);

parentsRouter.put("/state/:id", parentCtrl.updateOneState);

parentsRouter.delete("/:emai/:phone/:id", parentCtrl.deleteOne);

module.exports = parentsRouter;
