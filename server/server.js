const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Loosen the cors
app.use(cors());

// In-memory data
const accountNumbers = [1001, 1002, 1003, 1004, 1005];
let selectedAccount = 1001;

// Route 1: Get list of account numbers
app.get('/accounts', (req, res) => {
  res.json(accountNumbers);
});

// Route 2: Select an account number
app.post('/select-account', (req, res) => {
  const { accountNumber } = req.body;

  if (!accountNumber) {
    return res.status(400).json({ error: 'Account number is required' });
  }

  if (!accountNumbers.includes(accountNumber)) {
    return res.status(400).json({ error: 'Invalid account number' });
  }

  selectedAccount = accountNumber;
  res.json({ message: 'Account selected successfully', selectedAccount });
});

// Additional route to check the currently selected account
app.get('/selected-account', (req, res) => {
  res.json({ selectedAccount });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
