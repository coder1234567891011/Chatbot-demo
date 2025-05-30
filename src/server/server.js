const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const {invokeAgent} = require('./bedrock-connect')
require('dotenv').config();

const app = express();

app.use(cors({origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization']}));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const agentReply = await invokeAgent(userMessage);
    res.json({ reply: agentReply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('AI server listening on port 3000'));