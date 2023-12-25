const Router = require("express");
const router = new Router();
const favoriteController = require("../controllers/favoriteController");
//const checkRole = require("../middleware/checkRoleMiddleware");
/**
 * @swagger
 * /favorite:
 *   post:
 *     summary: Добавить книгу в избранное
 *     tags:
 *       - Favorite
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
 *                 type: integer
 *               bookId:
 *                 type: integer
 *             required:
 *               - userId
 *               - bookId
 *     responses:
 *       '200':
 *         description: Книга добавлена в избранное успешно
 *         content:
 *           application/json:
 *             example:
 *               message: Book added to favorites successfully
 *               favoriteBook: { id: 1, userId: 123, bookId: 456, createdAt: "2023-01-01T12:00:00.000Z", updatedAt: "2023-01-01T12:00:00.000Z" }
 *       '500':
 *         description: Внутренняя ошибка сервера
 */
router.post("/", favoriteController.addToFavorites);

/**
 * @swagger
 * /favorite:
 *   delete:
 *     summary: Удалить книгу из избранного
 *     tags:
 *       - Favorite
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
 *                 type: integer
 *               bookId:
 *                 type: integer
 *             required:
 *               - userId
 *               - bookId
 *     responses:
 *       '200':
 *         description: Книга удалена из избранного успешно
 *         content:
 *           application/json:
 *             example:
 *               message: Book removed from favorites successfully
 *       '500':
 *         description: Внутренняя ошибка сервера
 */
router.delete("/", favoriteController.removeFromFavorites);

/**
 * @swagger
 * /favorite/{userId}:
 *   get:
 *     summary: Получить список избранных книг для пользователя
 *     tags:
 *       - Favorite
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Список избранных книг для пользователя
 *         content:
 *           application/json:
 *             example:
 *               favorites: [{ id: 1, userId: 123, bookId: 456, createdAt: "2023-01-01T12:00:00.000Z", updatedAt: "2023-01-01T12:00:00.000Z", Book: { id: 456, name: "Book Name" } }]
 *       '500':
 *         description: Внутренняя ошибка сервера
 */
router.get("/:userId", favoriteController.getFavoritesByUser);

module.exports = router;
