// // server/api/index.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const serverless = require('serverless-http');

// dotenv.config();

// const authRoutes = require('../routes/authRoutes');
// const postRoutes = require('../routes/postRoutes');
// const contactRoutes = require('../routes/contactRoutes');

// const app = express();

// app.use(cors({
//   origin: ["https://assig-drg2.vercel.app"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// app.use('/api/auth', authRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/contact', contactRoutes);

// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });

// let isConnected = false;
// async function connectDB() {
//   if (isConnected) return;
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     isConnected = true;
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// }
// connectDB();

// // 👉 Must export this for Vercel
// module.exports = app;
// module.exports.handler = serverless(app);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const serverless = require('serverless-http');

dotenv.config();

const authRoutes = require('../routes/authRoutes');
const postRoutes = require('../routes/postRoutes');
const contactRoutes = require('../routes/contactRoutes');

const app = express();

// ✅ Setup middleware
app.use(cors({
  origin: ["https://assig-drg2.vercel.app"], // 👈 Your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static files (if needed)
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/contact', contactRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// ✅ MongoDB connection (connect once)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB error:", error);
  }
}
connectDB();

// ✅ Export only handler for Vercel
module.exports = serverless(app);
