import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  planetName: {
    type: String,
    required: true
  },
  planetColor: {
    type: String,
    default: '#6366f1'
  },
  completed: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  }
});

export default mongoose.model('Task', taskSchema);
