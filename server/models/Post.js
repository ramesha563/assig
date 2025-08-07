// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   category: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('Post', postSchema);


const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // post ka owner
});

module.exports = mongoose.model('Post', postSchema);
