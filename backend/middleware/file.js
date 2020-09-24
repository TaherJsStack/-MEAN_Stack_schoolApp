const multer = require("multer");

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

module.exports = multer({ storage: storage }).single("imageUrl");
