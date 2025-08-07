


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');

// // Load environment variables
// dotenv.config();

// const authRoutes = require('./routes/authRoutes');
// const postRoutes = require('./routes/postRoutes');
// const contactRoutes = require('./routes/contactRoutes');

// const app = express();

// // CORS Configuration
// app.use(cors({
 
//   origin: ["https://assig-drg2.vercel.app/"], // ✅ Your frontend deployed URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Static file access
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/contact', contactRoutes);

// // MongoDB Connection
// let isConnected = false;
// async function connectDB() {
//   if (isConnected) return;
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     isConnected = true;
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// }

// // Default route
// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });

// // Export the handler for Vercel
// module.exports = async (req, res) => {
//   await connectDB();
//   app(req, res);
// };
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const serverless = require('serverless-http');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// ✅ CORS
app.use(cors({
  origin: ["https://assig-drg2.vercel.app"], // NO trailing slash
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/contact', contactRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// MongoDB connect
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
connectDB(); // ✅ Call DB connection directly

// ✅ Export Vercel-compatible handler
module.exports = app;
module.exports.handler = serverless(app);
