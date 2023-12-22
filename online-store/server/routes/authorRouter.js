const { Router } = require('express');
const router = Router();
const authorController = require('../controllers/authorController');
const checkRole = require('../middleware/checkRoleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Author management
 */

/**
 * @swagger
 * /api/author:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
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
 *               biography:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '201':
 *         description: Author created successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post('/', checkRole('ADMIN'), authorController.create);

/**
 * @swagger
 * /api/author:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       '200':
 *         description: A list of authors
 *       '500':
 *         description: Internal server error
 */
router.get('/', authorController.getAll);

module.exports = router;
