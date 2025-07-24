const express = require('express');
require('dotenv').config();
const db = require('./db/index'); // ← include your MySQL connection
const swaggerDocs = require('./docs/swagger.js');//swagger import

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Bhaktipath Backend API');
});

// Swagger
swaggerDocs(app); // 👈 enable Swagger


// ✅ Test route to fetch all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});


app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
  console.log(`📄 Swagger docs: http://localhost:${PORT}/api-docs`);
});
