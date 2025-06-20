const JWT = require('jsonwebtoken');
const User = require('../models/userModel');
const Otp = require('../models/otpModel');
const connectDB = require('../config/db');
const UserSubCategory = require('../models/userSubCategoriesModel')
const UserCategory = require('../models/userCategoryModel')


const generateToken = (user) => {
  return JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const registerController = async (req, res) => {
  await connectDB();
  try {
    console.log('Incoming body:', req.body);

    const {
      phoneNo,
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

    if (!phoneNo || !firstName || !lastName || !email || !dob|| !gender) {
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

  const getCategoryId = async (categoryName) => {
  const category = await UserCategory.findOne({ name: categoryName });
  if (!category) throw new Error(`Category '${categoryName}' not found.`);
  return category._id;
};

const mapField = async (value, categoryName) => {
  const categoryId = await getCategoryId(categoryName);
  const obj = await UserSubCategory.findOne({ name: value, category: categoryId });
  if (!obj) throw new Error(`Invalid ${categoryName} selected: ${value}`);
  return obj._id;
};

const mapArrayField = async (array, categoryName) => {
  const categoryId = await getCategoryId(categoryName);
  const results = [];
  for (const val of array) {
    const obj = await UserSubCategory.findOne({ name: val, category: categoryId });
    if (!obj) throw new Error(`Invalid ${categoryName} selected: ${val}`);
    results.push(obj._id);
  }
  return results;
};



     const genderId = await mapField(gender, 'gender');
    const lookingForId = await mapField(lookingFor, 'lookingFor');
    const hobbiesIds = await mapArrayField(hobbies, 'hobbies');
     const hangoutSpotsIds = await mapArrayField(hangoutSpots, 'hangoutSpots');
    const relationshipStatusId = await mapField(relationshipStatus, 'relationshipStatus');
    const educationId = await mapField(education, 'education');
    const salaryId = await mapField(salary, 'salary');
   

    const newUser = new User({
      firstName,
      lastName,
      userId: `USER-${Date.now()}`,
      phoneNo,
      email,
      dob,
      gender: genderId,
      lookingFor:lookingForId,
      hobbies:hobbiesIds,
      hangoutSpots:hangoutSpotsIds,
      relationshipStatus:relationshipStatusId,
      education:educationId,
      companyName,
      salary:salaryId,
      photo,
      
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

    await connectDB();

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


const getSingleUserController = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('gender sexuality religion zodiacSign country bodyType language smoking drinking salary relationshipStatus hobbies');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Get User Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find()
      .populate('gender sexuality religion zodiacSign country bodyType language smoking drinking salary relationshipStatus hobbies');

    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error('Get All Users Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};




const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      firstName, lastName, email, phoneNo, dob, gender, sexuality, religion, zodiacSign,
      country, bodyType, language, smoking, drinking, salary, relationshipStatus,
      hobbies, companyName, photo
    } = req.body;

    const updateFields = {
      firstName, lastName, email, phoneNo, dob, companyName
    };

    const getCategoryId = async (categoryName) => {
  const category = await UserCategory.findOne({ name: categoryName });
  if (!category) throw new Error(`Category '${categoryName}' not found.`);
  return category._id;
};

const mapField = async (value, categoryName) => {
  const categoryId = await getCategoryId(categoryName);
  const obj = await UserSubCategory.findOne({ name: value, category: categoryId });
  if (!obj) throw new Error(`Invalid ${categoryName} selected: ${value}`);
  return obj._id;
};

const mapArrayField = async (array, categoryName) => {
  const categoryId = await getCategoryId(categoryName);
  const results = [];
  for (const val of array) {
    const obj = await UserSubCategory.findOne({ name: val, category: categoryId });
    if (!obj) throw new Error(`Invalid ${categoryName} selected: ${val}`);
    results.push(obj._id);
  }
  return results;
};

    if (photo) updateFields.photo = photo;
    if (gender) updateFields.gender = await mapField(gender, 'gender');
    if (sexuality) updateFields.sexuality = await mapField(sexuality, 'sexuality');
    if (religion) updateFields.religion = await mapField(religion, 'religion');
    if (zodiacSign) updateFields.zodiacSign = await mapField(zodiacSign, 'zodiacSign');
    if (country) updateFields.country = await mapField(country, 'country');
    if (bodyType) updateFields.bodyType = await mapField(bodyType, 'bodyType');
    if (language) updateFields.language = await mapArrayField(language, 'language');
    if (smoking) updateFields.smoking = await mapField(smoking, 'smoking');
    if (drinking) updateFields.drinking = await mapField(drinking, 'drinking');
    if (salary) updateFields.income = await mapField(salary, 'salary');
    if (relationshipStatus) updateFields.status = await mapField(relationshipStatus, 'relationshipStatus');
    if (hobbies) updateFields.hobbies = await mapArrayField(hobbies, 'hobbies');

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User updated', user: updatedUser });
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};







module.exports = { registerController , loginController, getSingleUserController, getAllUsersController,deleteUserController,updateUserController };
