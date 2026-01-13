import express from 'express';
import Task from '../models/Task.js';
import Progress from '../models/Progress.js';
import ActivityLog from '../models/ActivityLog.js';

const router = express.Router();

// Get all tasks for a user
router.get('/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId }).sort({ order: 1 });
    
    res.json({
      success: true,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get tasks',
      error: error.message
    });
  }
});

// Create new task
router.post('/', async (req, res) => {
  try {
    const { userId, title, planetName, planetColor } = req.body;
    
    const taskCount = await Task.countDocuments({ userId });
    
    const newTask = new Task({
      userId,
      title,
      planetName,
      planetColor,
      order: taskCount
    });

    await newTask.save();

    res.status(201).json({
      success: true,
      message: 'Task created',
      task: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create task',
      error: error.message
    });
  }
});

// Update task
router.put('/:taskId', async (req, res) => {
  try {
    const { title, completed } = req.body;
    
    const updateData = { title };
    if (completed !== undefined) {
      updateData.completed = completed;
      if (completed) {
        updateData.completedAt = new Date();
      }
    }

    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      updateData,
      { new: true }
    );

    // If task completed, update progress
    if (completed && task) {
      const progress = await Progress.findOne({ userId: task.userId });
      if (progress) {
        progress.totalTasksCompleted += 1;
        progress.lastActivityDate = new Date();
        await progress.save();

        // Log activity
        const log = new ActivityLog({
          userId: task.userId,
          activityType: 'task_completed',
          description: `Completed task: ${task.title}`,
          metadata: { taskId: task._id }
        });
        await log.save();
      }
    }

    res.json({
      success: true,
      message: 'Task updated',
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
      error: error.message
    });
  }
});

// Delete task
router.delete('/:taskId', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    
    res.json({
      success: true,
      message: 'Task deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
      error: error.message
    });
  }
});

// Get tasks for today
router.get('/:userId/today', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tasks = await Task.find({
      userId: req.params.userId,
      date: { $gte: today }
    }).sort({ order: 1 });
    
    res.json({
      success: true,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get today\'s tasks',
      error: error.message
    });
  }
});

export default router;
