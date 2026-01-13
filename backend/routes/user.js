import express from 'express';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Create user profile after Firebase signup
router.post('/create', async (req, res) => {
  try {
    const { firebaseUid, email, username, avatarId } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ firebaseUid });
    if (existingUser) {
      return res.json({
        success: true,
        message: 'User already exists',
        user: existingUser
      });
    }

    // Create new user
    const newUser = new User({
      firebaseUid,
      email,
      username,
      avatarId: avatarId || 1
    });

    await newUser.save();

    // Create progress document
    const progress = new Progress({
      userId: firebaseUid
    });
    await progress.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser
    });
  } catch (error) {
    console.error('User creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message
    });
  }
});

// Get user profile
router.get('/:firebaseUid', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get user',
      error: error.message
    });
  }
});

// Update user profile
router.put('/:firebaseUid', async (req, res) => {
  try {
    const { username, avatarId } = req.body;
    
    const user = await User.findOneAndUpdate(
      { firebaseUid: req.params.firebaseUid },
      { username, avatarId },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Profile updated',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
});

// Set parent password
router.post('/parent-password', async (req, res) => {
  try {
    const { firebaseUid, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await User.findOneAndUpdate(
      { firebaseUid },
      { parentPassword: hashedPassword, role: 'parent' }
    );

    res.json({
      success: true,
      message: 'Parent password set successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to set password',
      error: error.message
    });
  }
});

// Verify parent password
router.post('/verify-parent', async (req, res) => {
  try {
    const { firebaseUid, password } = req.body;
    
    const user = await User.findOne({ firebaseUid });
    
    if (!user || !user.parentPassword) {
      return res.status(404).json({
        success: false,
        message: 'Parent password not set'
      });
    }

    const isValid = await bcrypt.compare(password, user.parentPassword);
    
    res.json({
      success: true,
      valid: isValid
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Verification failed',
      error: error.message
    });
  }
});

export default router;
