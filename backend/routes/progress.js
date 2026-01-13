import express from 'express';
import Progress from '../models/Progress.js';
import ActivityLog from '../models/ActivityLog.js';

const router = express.Router();

// Get user progress
router.get('/:userId', async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: req.params.userId });
    
    if (!progress) {
      progress = new Progress({ userId: req.params.userId });
      await progress.save();
    }

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get progress',
      error: error.message
    });
  }
});

// Award badge
router.post('/badge', async (req, res) => {
  try {
    const { userId, badgeName, badgeIcon } = req.body;
    
    const progress = await Progress.findOne({ userId });
    
    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress not found'
      });
    }

    // Check if badge already awarded
    const hasBadge = progress.badges.some(b => b.name === badgeName);
    if (hasBadge) {
      return res.json({
        success: true,
        message: 'Badge already awarded'
      });
    }

    progress.badges.push({
      name: badgeName,
      icon: badgeIcon,
      earnedAt: new Date()
    });

    await progress.save();

    // Log activity
    const log = new ActivityLog({
      userId,
      activityType: 'badge_earned',
      description: `Earned badge: ${badgeName}`,
      metadata: { badgeName, badgeIcon }
    });
    await log.save();

    res.json({
      success: true,
      message: 'Badge awarded',
      progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to award badge',
      error: error.message
    });
  }
});

// Update game stats
router.post('/game-played', async (req, res) => {
  try {
    const { userId, gameName } = req.body;
    
    const progress = await Progress.findOne({ userId });
    
    if (progress) {
      if (gameName === 'planetMatcher') {
        progress.gamesPlayed.planetMatcher += 1;
      } else if (gameName === 'alienEmotions') {
        progress.gamesPlayed.alienEmotions += 1;
      }
      
      await progress.save();

      // Log activity
      const log = new ActivityLog({
        userId,
        activityType: 'game_played',
        description: `Played ${gameName}`,
        metadata: { gameName }
      });
      await log.save();
    }

    res.json({
      success: true,
      message: 'Game stats updated'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update game stats',
      error: error.message
    });
  }
});

// Get activity logs (for parent dashboard)
router.get('/logs/:userId', async (req, res) => {
  try {
    const logs = await ActivityLog.find({ userId: req.params.userId })
      .sort({ timestamp: -1 })
      .limit(50);
    
    res.json({
      success: true,
      logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get activity logs',
      error: error.message
    });
  }
});

export default router;
