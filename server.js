const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/chat', (req, res) => {
  const userMessage = req.body.message || '';
  let response = 'I am here to help!';

  if (userMessage.toLowerCase().includes('hello')) {
    response = 'Hi there! How can I assist you today?';
  }

  res.json({ response });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
