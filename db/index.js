const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Yash@2007',   // Your MySQL password
  database: 'Devgad_db'    // Your database name
});

// ✅ Use the correct variable name: db
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
  } else {
    console.log('✅ Connected to MySQL Database');
  }
});

module.exports = db;
