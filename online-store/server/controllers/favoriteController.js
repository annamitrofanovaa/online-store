const { FavoriteBook } = require('../models/models');
const checkAuthenticationMiddleware = require('../middleware/checkAuthenticationMiddleware');


class FavoriteController {
  async addToFavorites(req, res) {
    try {
      const userId = req.user.id;
      const { bookId } = req.body;

      const existingFavorite = await FavoriteBook.findOne({
        where: { userId, bookId },
      });

      if (existingFavorite) {
        return res.status(400).json({ message: 'Book is already in favorites.' });
      }

      const newFavorite = await FavoriteBook.create({ userId, bookId });

      return res.json({ message: 'Book added to favorites successfully', favorite: newFavorite });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async getFavorites(req, res) {
    try {
      const userId = req.user.id;

      const favorites = await FavoriteBook.findAll({
        where: { userId },
      });

      return res.json({ favorites });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async removeFromFavorites(req, res) {
    try {
      const userId = req.user.id;
      const { bookId } = req.body;

      const favorite = await FavoriteBook.findOne({
        where: { userId, bookId },
      });

      if (!favorite) {
        return res.status(404).json({ message: 'Book not found in favorites.' });
      }

      await favorite.destroy();

      return res.json({ message: 'Book removed from favorites successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
}

module.exports = new FavoriteController();
