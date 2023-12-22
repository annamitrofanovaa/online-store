const { Router } = require('express');
const router = Router();
const genreController = require('../controllers/genreController');
const checkRole = require('../middleware/checkRoleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: Genre management
 */

/**
 * @swagger
 * /api/genre:
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '201':
 *         description: Genre created successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden (if not an ADMIN)
 *       '500':
 *         description: Internal server error
 */
router.post('/', checkRole('ADMIN'), genreController.create);

/**
 * @swagger
 * /api/genre:
 *   get:
 *     summary: Get all genres
 *     tags: [Genres]
 *     responses:
 *       '200':
 *         description: A list of genres
 *       '500':
 *         description: Internal server error
 */
router.get('/', genreController.getAll);

module.exports = router;
