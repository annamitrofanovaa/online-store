const ApiError = require("../error/ApiError");
const { FavoriteBook, Book } = require("../models/models");

class FavoriteController {
  async addToFavorites(req, res, next) {
    const { userId, bookId } = req.body;

    try {
      const favoriteBook = await FavoriteBook.create({ userId, bookId });
      return res.json({
        message: "Book added to favorites successfully",
        favoriteBook,
      });
    } catch (error) {
      return next(ApiError.internal("Unable to add book to favorites"));
    }
  }

  async removeFromFavorites(req, res, next) {
    const { userId, bookId } = req.body;

    try {
      await FavoriteBook.destroy({ where: { userId, bookId } });
      return res.json({ message: "Book removed from favorites successfully" });
    } catch (error) {
      return next(ApiError.internal("Unable to remove book from favorites"));
    }
  }

  async getFavoritesByUser(req, res, next) {
    const { userId } = req.params;

    try {
      const favorites = await FavoriteBook.findAll({
        where: { userId },
        include: [{ model: Book, attributes: ["id", "name"] }],
      });

      return res.json({ favorites });
    } catch (error) {
      return next(ApiError.internal("Unable to get user favorites"));
    }
  }
}

module.exports = new FavoriteController();
