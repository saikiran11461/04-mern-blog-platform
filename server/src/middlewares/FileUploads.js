
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const {cloudinary} = require('./cloudnary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blogs', 
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const parser = multer({ storage: storage });

module.exports = {parser};







// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('./cloudinaryConfig');

// // Cloudinary storage config
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'blogs',
//     allowed_formats: ['jpg', 'jpeg', 'png'],
//     transformation: [{ width: 800, height: 600, crop: 'limit' }], 
//   },
// });

// // // Optional file filter (can be removed since Cloudinary handles type too)
// // const fileFilter = (req, file, cb) => {
// //   const fileTypes = /jpeg|jpg|png/;
// //   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
// //   const mimetype = fileTypes.test(file.mimetype);
// //   if (extname && mimetype) cb(null, true);
// //   else cb(new Error('Only .jpeg, .jpg, and .png files are allowed!'));
// // };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// module.exports = { upload };
