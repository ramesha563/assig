

//server/serverless.js
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tumhari routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/contact', contactRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('✅ Serverless API is working on Vercel!');
});

// MongoDB connect (sirf ek baar connect hoga)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected (serverless)"))
  .catch((err) => console.log("❌ Mongo error:", err));

// Vercel export
module.exports = app;
module.exports.handler = serverless(app);



