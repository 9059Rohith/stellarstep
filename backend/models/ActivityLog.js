import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  activityType: {
    type: String,
    required: true,
    enum: ['task_completed', 'game_played', 'badge_earned', 'login', 'space_school_visit']
  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

export default mongoose.model('ActivityLog', activityLogSchema);
