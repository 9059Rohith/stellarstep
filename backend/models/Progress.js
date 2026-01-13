import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  badges: [{
    name: String,
    icon: String,
    earnedAt: Date
  }],
  totalTasksCompleted: {
    type: Number,
    default: 0
  },
  streakDays: {
    type: Number,
    default: 0
  },
  lastActivityDate: {
    type: Date,
    default: Date.now
  },
  gamesPlayed: {
    planetMatcher: { type: Number, default: 0 },
    alienEmotions: { type: Number, default: 0 }
  }
});

export default mongoose.model('Progress', progressSchema);
