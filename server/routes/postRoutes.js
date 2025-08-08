


// const express = require('express');
// const router = express.Router();
// const {
//   createPost,
//   getPosts,
//   updatePost,
//   deletePost
// } = require('../controllers/postController');

// // Middlewares
// const authMiddleware = require('../middlewares/authMiddleware');

// // Public: GET all
// router.get('/', getPosts);

// // Protected routes
// router.post('/', authMiddleware, createPost);
// router.get('/', authMiddleware, getPosts);

// router.put('/:id', authMiddleware, updatePost);
// router.delete('/:id', authMiddleware, deletePost);

// module.exports = router;
const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  updatePost,
  deletePost
} = require('../controllers/postController');

// Middleware to protect routes
const authMiddleware = require('../middlewares/authMiddleware');

// ✅ All routes are protected
router.get('/', authMiddleware, getPosts);
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
 