// // 
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, number, age } = req.body;
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     const hashed = await bcrypt.hash(password, 10);

//     let imageUrl = null;
//     if (req.file) {
//       const cloudinaryResult = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "users" },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result);
//           }
//         );
//         stream.end(req.file.buffer);
//       });

//       imageUrl = cloudinaryResult.secure_url;
//     }

//     const newUser = await User.create({
//       name,
//       email,
//       password: hashed,
//       number,
//       age,
//       image: imageUrl,
//     });

//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '10min' });

//     res.status(201).json({ token, user: newUser });
//   } catch (error) {
//     console.error("Registration Error:", error); // optional
//     res.status(500).json({ message: 'Registration failed', error: error.message });
//   }
// };

// /////////////////////////////////// Login User ///////////////////////////////////
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10min' });

//     res.status(200).json({ token, user });
//   } catch (error) {
//     res.status(500).json({ message: 'Login failed', error: error.message });
//   }
// };

// /////////////////////////////////// Get Profile ///////////////////////////////////
// exports.profile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching profile', error: error.message });
//   }
// };

// /////////////////////////////////// Update Profile ///////////////////////////////////
// /////////////////////////////////// Update Profile ///////////////////////////////////
// exports.updateProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { name, email, number, age } = req.body;

//     let updatedData = { name, email, number, age };

//     // ✅ Check if new image is uploaded
//     if (req.file) {
//       const cloudinaryResult = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "users" },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result);
//           }
//         );
//         stream.end(req.file.buffer);
//       });

//       updatedData.image = cloudinaryResult.secure_url;
//     }

//     const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
//       new: true,
//     }).select('-password');

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update profile', error: error.message });
//   }
// };

// /////////////////////////////////// Forgot Password ///////////////////////////////////
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });
//     const resetLink = `http://localhost:5173/reset-password/${token}`;

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"MyApp" <${process.env.EMAIL_USER}>`,
//       to: user.email,
//       subject: 'Reset your password',
//       html: `
//         <p>Hello ${user.name},</p>
//         <p>Click the button below to reset your password:</p>
//         <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
//         <p>This link will expire in 10 minutes.</p>
//         <p>If you did not request this, you can ignore this email.</p>
//         <p style="font-size: 12px; color: gray;">This link will open in a new tab for security purposes.</p>
//       `,
//     });

//     res.status(200).json({ message: 'Reset link sent to your email.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong.', error: error.message });
//   }
// };

// /////////////////////////////////// Reset Password ///////////////////////////////////
// exports.resetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ message: 'Password reset successful.' });
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid or expired token.' });
//   }
// };
// ✅ Updated authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cloudinary = require('../utils/cloudinary');
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
  try {
    const { name, email, password, number, age } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    let imageUrl = null;
    if (req.file) {
      const cloudinaryResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "users" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = cloudinaryResult.secure_url;
    }

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      number,
      age,
      image: imageUrl,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '10min' });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10min' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, number, age } = req.body;

    let updatedData = { name, email, number, age };

    // ✅ Image Upload to Cloudinary
    if (req.file) {
      const cloudinaryResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "users" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer); // From multer.memoryStorage()
      });

      updatedData.image = cloudinaryResult.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};



exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `MyApp <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Reset your password',
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    });

    res.status(200).json({ message: 'Reset link sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
};
