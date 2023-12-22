// routes/userRouter.js

<<<<<<< HEAD
const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
=======
router.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // Укажите нужный домен или '*' для доступа с любых доменов
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.status(204).send();
  });

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
>>>>>>> 03913761b67b94f05ab8298452f479dae29f166d

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/user/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: Successfully registered
 *       '400':
 *         description: Bad request
 */
router.post('/registration', userController.registration);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login to the system
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *       '401':
 *         description: Invalid credentials
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/user/auth:
 *   get:
 *     summary: Check if the user is authenticated
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User is authenticated
 *       '401':
 *         description: Unauthorized
 */
router.get('/auth', authMiddleware, userController.check);

module.exports = router;
