const express = require('express');
const router = express.Router();
const db = require('../db/index'); // MySQL connection

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management APIs
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of all roles
 */
router.get('/', (req, res) => {
  db.query('SELECT * FROM roles', (err, results) => {
    if (err) {
      console.error('Error fetching roles:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: manager
 *     responses:
 *       201:
 *         description: Role created
 */
router.post('/', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO roles (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      console.error('Error creating role:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: result.insertId, name });
  });
});

module.exports = router;
