







// // server/routes/authRoutes.js
// const express = require('express');
// const router = express.Router();

// // Controllers
// const { register, login, profile, updateProfile } = require('../controllers/authController');
// const { forgotPassword, resetPassword } = require('../controllers/authController');


// // Middlewares
// const authMiddleware = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/uploadMiddleware');

// // Routes
// router.post('/register', upload.single('image'), register); 
// router.post('/login', login);
// router.get('/profile', authMiddleware, profile);
// router.put('/update', authMiddleware, upload.single('image'), updateProfile);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password/:token', resetPassword);


// module.exports = router;




// // server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

// ✅ Controllers - all in one line
const { register, login, profile, updateProfile, forgotPassword, resetPassword } = require('../controllers/authController');

// ✅ Middlewares
const authMiddleware = require('../middlewares/authMiddleware');

// ✅ Routes
router.post('/register', upload.single('image'), register);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
router.put('/update', authMiddleware, upload.single('image'), updateProfile);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;



