const JWT = require('jsonwebtoken');
const User = require('../models/userModel');
const Otp = require('../models/otpModel');
const connectDB = require('../config/db');

const generateToken = (user) => {
  return JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const registerController = async (req, res) => {
  await connectDB;
  try {
    const {
      phoneNo,
      otp, // optional for testing
      firstName,
      lastName,
      email,
      dob,
      gender,
      lookingFor,
      hobbies,
      hangoutSpots,
      relationshipStatus,
      education,
      companyName,
      salary,
      photo
    } = req.body;

  
    if (!phoneNo || !firstName || !lastName || !email || !dob || !gender) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields.',
      });
    }

  
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNo }] });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email or phone number.',
      });
    }

    
    const newUser = new User({
      firstName,
      lastName,
      userId: `USER-${Date.now()}`,
      phoneNo,
      email,
      dob,
      gender,
      lookingFor,
      hobbies,
      hangoutSpots,
      relationshipStatus,
      education,
      companyName,
      salary,
      photo,
      otp // only saved for testing, not verified here
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phoneNo: newUser.phoneNo,
        dob: newUser.dob,
        gender: newUser.gender,
        token
      },
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};



// Helper to generate 6-digit OTP
// const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();


// STEP 1: SEND OTP
// const sendOtpController = async (req, res) => {
//   try {
//     const { phoneNo } = req.body;

//     if (!phoneNo) {
//       return res.status(400).json({ success: false, message: "Phone number is required" });
//     }

//     const otp = generateOTP();

//     // Save OTP in DB (in production, use Redis or similar)
//     await Otp.create({ phoneNo, otp });

//     // In production, send OTP via SMS (Twilio, etc)
//     console.log(`Generated OTP for ${phoneNo}: ${otp}`);

//     return res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//       otp, // for testing only
//     });

//   } catch (error) {
//     console.error("Send OTP Error:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


// STEP 2: VERIFY OTP & LOGIN
// const verifyOtpLoginController = async (req, res) => {
//   try {
//     const { phoneNo, otp } = req.body;

//     if (!phoneNo || !otp) {
//       return res.status(400).json({ success: false, message: "Phone number and OTP required" });
//     }

//     // Check OTP
//     const validOtp = await Otp.findOne({ phoneNo, otp });
//     if (!validOtp) {
//       return res.status(401).json({ success: false, message: "Invalid or expired OTP" });
//     }

//     // Find user
//     let user = await User.findOne({ phoneNo });

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not registered" });
//     }

//     // OTP is valid → generate JWT
//     const token = generateToken(user);

//     // Delete used OTP
//     await Otp.deleteMany({ phoneNo });

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         phoneNo: user.phoneNo,
//         gender: user.gender,
//       },
//     });

//   } catch (error) {
//     console.error("Verify OTP Error:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

const loginController = async (req, res) => {

    await connectDB;

  try {
    const { phoneNo } = req.body;

    if (!phoneNo) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required',
      });
    }

    let user = await User.findOne({ phoneNo });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Please register first.',
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNo: user.phoneNo,
        gender: user.gender,
      },
    });

  } catch (error) {
    console.error('Direct Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


const getUserController = async (req, res) => {

    await connectDB;

  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-otp'); // exclude OTP

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


const getAllUsersController = async (req, res) => {
    await connectDB;

  try {
    const users = await User.find().select('-otp');

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error('Get All Users Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const deleteUserController = async (req, res) => {
    await connectDB;

  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully.',
    });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};

const updateUserController = async (req, res) => {
    await connectDB;

  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};







module.exports = { registerController , loginController, getUserController, getAllUsersController,deleteUserController,updateUserController };
