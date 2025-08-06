// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Create upload directory if it doesn't exist
// const uploadDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// module.exports = upload;
const multer = require('multer');

// Store uploaded files in memory (RAM), not on disk
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
