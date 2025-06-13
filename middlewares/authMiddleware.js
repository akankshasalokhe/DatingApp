const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Middleware to verify JWT and attach user object to request
const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB using ID from token
    const user = await userModel.findById(decoded._id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

// Middleware to check if user has admin role
const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === 1) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: 'Admin access denied',
      });
    }
  } catch (error) {
    console.error('Admin Middleware Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error in admin check',
    });
  }
};

module.exports = { requireSignIn, isAdmin };
