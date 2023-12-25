const ApiError = require("../error/ApiError");
const { Favorite, Book } = require("../models/models");

class FavoriteController {
  async addToFavorites(req, res, next) {
    const { userId, bookId } = req.body;

    try {
      const favoriteBook = await Favorite.create({ userId, bookId });
      return res.json({
        message: "Book added to favorites successfully",
        favoriteBook,
      });
    } catch (error) {
      return next(ApiError.internal("Unable to add book to favorites"));
    }
  }

  async removeFromFavorites(req, res, next) {
    try {
      const { userId, bookId } = req.params;
      const row = await Favorite.findOne({
        where: { userId, bookId },
      });

      if (row) {
        await row.destroy(); // deletes the row
      }
      return res.json({ message: "Book removed from favorites successfully" });
      // await Favorite.destroy({ where: { userId, bookId } });
    } catch (error) {
      return next(ApiError.internal(error));
    }
  }

  async getFavoritesByUser(req, res, next) {
    const { userId } = req.params;

    try {
      const favorites = await Favorite.findAll({
        where: { userId },
      });

      return res.json(favorites);
    } catch (error) {
      return next(ApiError.internal(error));
    }
  }
}

module.exports = new FavoriteController();
