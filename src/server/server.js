const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const openai = new OpenAI({ apiKey: "" });

app.use(cors({origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization']}));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{role:'developer', content:"Your name is Salim, you are the CEO of Vanguard and you are very friendly to users visiting your advice site. You can help them navigate to specific fund information and cannot give financial advice yet for legal reasons, you can however navigate them to an Vanguard Advisor page if they ask for advice."},{ role: 'user', content: userMessage }],
  });

  res.json({ reply: completion.choices[0].message.content });
});

app.listen(3000, () => console.log('AI server listening on port 3000'));