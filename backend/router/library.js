const express    = require("express");
const multer     = require('multer');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
// const checkAuth  = require('../middleware/check-auth') ;
const libraryCtrl   = require('../controllers/library');
const libraryRouter = express.Router();
const extrctFile    = require('../middleware/file')

// const MIMIE_TYPE_MAP = {
//   'image/png': 'png',
//   'image/jpeg': 'jpg',
//   'image/jpg': 'jpg',
//   'application/pdf': 'pdf'
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       const isValid = MIMIE_TYPE_MAP[file.mimetype];
//       let error = new Error('Invalid mime Type');
//       if (isValid) {
//           error = null;
//       }
//       cb(error, 'Backend/images/library')
//   },
//   filename: (req, file, cb) => {
//       const name = file.originalname.toLowerCase().split(' ').join('-');
//       const ext = MIMIE_TYPE_MAP[file.mimetype];
//       cb(null, name + '-' + Date.now() + '.' + ext);
//   },
// });

// libraryRouter.post('', multipartMiddleware({storage: storage}), multer({storage: storage}).single('imageUrl'), function(req, resp) {
//   console.log('multipartMiddleware =>', req.body, req.files);
//   // don't forget to delete all req.files when done
// });

libraryRouter.post("", extrctFile, libraryCtrl.saveBook);

libraryRouter.get("",  libraryCtrl.getAllLibrary);

// libraryRouter.put("/:id", multer({storage: storage}).single('imageUrl'), libraryCtrl.updateOne);

// libraryRouter.get("/:employeeEmail/emailSearsh",  libraryCtrl.findOneByEmail);

// libraryRouter.get("/:workType/workTypeFillter",  libraryCtrl.workTypeFillter);

// libraryRouter.put("/state/:id", libraryCtrl.updateOneState);

// libraryRouter.delete("/:id", libraryCtrl.deleteOne);

module.exports = libraryRouter; 