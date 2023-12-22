const { Router } = require('express');
const router = Router();
const AdminController = require('../controllers/adminController');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin operations
 */

/**
 * @swagger
 * /api/admin/assignRole:
 *   post:
 *     summary: Assign a role to a user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - userId
 *               - role
 *     responses:
 *       '200':
 *         description: Role assigned successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post('/assignRole', (req, res, next) => AdminController.assignRole(req, res, next));

module.exports = router;
