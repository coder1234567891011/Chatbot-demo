const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const path = require('path');
require('dotenv').config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.GPT_KEY});

app.use(cors({origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization']}));
app.use(express.json());

app.use(express.static(path.join(__dirname,'/../dist/demo')))

app.get('/healthcheck', (req, res) => res.status(200).send('OK'));

app.get('*',(req, resp)=>{
    console.log(__dirname)
    resp.sendFile(path.join(__dirname, '/../dist/demo/index.html'))
});

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{role:'developer', content:"Your name is Greg, an advisor with the Vanguard Group and you are very friendly to users visiting your advice site. If they ask for fund information please give them price and performance info in JSON format only valid for a Chart.js Chart , including type, data.labels, and data.datasets."},{ role: 'user', content: userMessage }],
  });

  res.json({ reply: completion.choices[0].message.content });
});

app.listen(80, () => console.log('AI server listening on port 80'));