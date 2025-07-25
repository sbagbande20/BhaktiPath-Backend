const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/index');


const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username or email already exists
    const checkQuery = 'SELECT * FROM admins WHERE email = ? OR username = ?';
    const [rows] = await db.promise().query(checkQuery, [email, username]);

    if (rows.length > 0) {
      return res.status(400).json({ error: 'Email or username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin
    const insertQuery = 'INSERT INTO admins (username, email, password_hash) VALUES (?, ?, ?)';
    const [result] = await db.promise().query(insertQuery, [username, email, hashedPassword]);

    res.status(201).json({ message: 'Admin registered', adminId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM admins WHERE email = ?';
    const [rows] = await db.promise().query(query, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const admin = rows[0];

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // 🔽 Add this line here to debug your env variable
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { registerAdmin, loginAdmin };
