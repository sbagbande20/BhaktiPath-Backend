const express = require('express');
const router = express.Router();
const { registerAdmin } = require('../controllers/authcontroller'); // Import auth controller functions for admin registration
const { loginAdmin } = require('../controllers/authcontroller'); // Import auth controller functions for admin login

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 /**
/**
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: adminuser
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin registered
 *                 adminId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Admin already exists or bad request
 *       500:
 *         description: Internal server error
 */


router.post('/register', registerAdmin);
router.post('/login', loginAdmin); 



module.exports = router;
