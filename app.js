const express = require('express');
require('dotenv').config();
const db = require('./db/index'); // ← include your MySQL connection
const swaggerDocs = require('./docs/swagger.js');//swagger import
const roleRoutes = require('./routes/roles');
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use('/roles', roleRoutes); // Use the role routes
app.use('/auth', authRoutes); // Use the auth controller routes



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
