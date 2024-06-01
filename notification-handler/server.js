const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const notifications = [];

app.post('/receive_notification', (req, res) => {
  const { message } = req.body;
  notifications.push(message);
  console.log('Received warning:', message);
  res.sendStatus(200);
});

app.get('/notifications', (req, res) => {
  res.json(notifications);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
