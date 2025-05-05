const express = require('express');
const bodyParser = require('body-parser');
const { SessionsClient } = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const app = express();
const port = 3000;

// Create a Dialogflow session client
const sessionClient = new SessionsClient();

const projectId = 'your-google-cloud-project-id';  // Your Google Cloud Project ID
const sessionId = uuid.v4(); // Generate a unique session ID
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

app.use(bodyParser.json());

// Endpoint to handle chat messages
app.post('/chat', async (req, res) => {
  const message = req.body.message;

  // Create a request to Dialogflow
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en',
      },
    },
  };

  try {
    // Send the message to Dialogflow and get the response
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    // Send the response back to the client
    res.json({ response: result.fulfillmentText });
  } catch (err) {
    console.error('ERROR:', err);
    res.status(500).send('Error communicating with Dialogflow');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
