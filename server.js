const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow all cross-origin requests
app.use(express.json()); // Middleware to parse incoming JSON requests

// Handle POST request to '/chat'
app.post('/chat', (req, res) => {
  const userMessage = req.body.message; // Get the user's message
  let botResponse = 'Sorry, I didn\'t understand that.'; // Default response

  // Simple response logic based on the user's message
  if (userMessage.toLowerCase() === 'hello') {
    botResponse = 'Hi there! How can I assist you today?';
  } else if (userMessage.toLowerCase() === 'bye') {
    botResponse = 'Goodbye! Have a great day!';
  }

  // Send back the bot's response
  res.json({ response: botResponse });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
