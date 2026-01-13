import express from 'express';
import axios from 'axios';

const router = express.Router();

// Groq API endpoint
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Generate positive reinforcement message
router.post('/reinforcement', async (req, res) => {
  try {
    const { achievement } = req.body;

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'You are a friendly, encouraging AI assistant for children with autism. Use simple language, positive reinforcement, and space-themed metaphors. Keep responses to 2-3 short sentences.'
          },
          {
            role: 'user',
            content: `Generate a positive, encouraging message for a child who just ${achievement}. Use space themes like stars, planets, and astronauts.`
          }
        ],
        temperature: 0.7,
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const message = response.data.choices[0].message.content;

    res.json({
      success: true,
      message: message
    });
  } catch (error) {
    console.error('Groq API Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to generate reinforcement message',
      error: error.message
    });
  }
});

// Simplify space facts for Space School
router.post('/simplify', async (req, res) => {
  try {
    const { topic } = req.body;

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'You are an educational AI that explains space topics to children with autism. Use very simple language, short sentences, and concrete examples. Avoid metaphors that might be confusing. Keep explanations to 3-4 simple sentences.'
          },
          {
            role: 'user',
            content: `Explain ${topic} to a 7-year-old child with autism in 3-4 very simple sentences.`
          }
        ],
        temperature: 0.5,
        max_tokens: 150
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const explanation = response.data.choices[0].message.content;

    res.json({
      success: true,
      topic: topic,
      explanation: explanation
    });
  } catch (error) {
    console.error('Groq API Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to simplify topic',
      error: error.message
    });
  }
});

// Get random space fact
router.get('/space-fact', async (req, res) => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'You are an educational AI that shares interesting space facts for children with autism. Use simple language and make facts engaging and easy to understand.'
          },
          {
            role: 'user',
            content: 'Share one interesting but simple space fact that a child would find amazing. Keep it to 2 sentences.'
          }
        ],
        temperature: 0.8,
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const fact = response.data.choices[0].message.content;

    res.json({
      success: true,
      fact: fact
    });
  } catch (error) {
    console.error('Groq API Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to get space fact',
      error: error.message
    });
  }
});

export default router;
