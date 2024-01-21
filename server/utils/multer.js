// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: '../public/uploads/profile', 
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
//   });

//   const upload = multer({
//     storage: storage,
//   }).single('profilePicture');

  const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    if (req.uploadType === 'profilePicture') {
      uploadPath = '../public/uploads/profile/';
    } else if (req.uploadType === 'carImage') {
      uploadPath = '../public/uploads/car/';
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, 
  fileFilter: function (req, file, cb) {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Only image files are allowed!');
    }
  },
}).single('image');

module.exports = upload;
