const express = require('express');
const router = express.Router();
const bcrypt = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure this path is correct based on your folder structure

const auth = async (req, res, next) => {
  try {
    let token;

    // Get token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by decoded id and exclude sensitive info if needed
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid. User not found.'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated.'
        });
      }

      // Attach user info to request for next middleware/handlers
      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      next();
    } catch (error) {
      console.error('JWT verification failed:', error);
      return res.status(401).json({
        success: false,
        message: 'Token is not valid.'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

module.exports = auth;
