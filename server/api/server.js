const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const serverless = require('serverless-http');

// Load env variables
dotenv.config();

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'https://assig-drg2.vercel.app'], // ✅ Update this with your frontend URLs
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('../routes/authRoutes');
const postRoutes = require('../routes/postRoutes');
const contactRoutes = require('../routes/contactRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('🌟 Server is running...');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// ✅ For local: run the server
if (process.env.LOCAL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
  });
}

// ✅ For Vercel: export handler
module.exports = app;
module.exports.handler = serverless(app);
