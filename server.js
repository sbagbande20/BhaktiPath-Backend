const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Bhaktipath Backend API');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});
