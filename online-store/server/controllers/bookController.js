const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const { Book, BookInfo } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const { Book, BookInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class BookController {
  async create(req, res, next) {
    try {
      const { name, price, genreId, authorId, info } = req.body;

      const book = await Book.create({
        name,
        price,
        genreId,
        authorId,
        info,
      });

      if (info) {
        // info = JSON.parse(info); // Парсим из строки
        const bookInfo = await BookInfo.create({
          title: info.title,
          description: info.description,
          bookId: book.id,
        });
        console.log("BookInfo created:", bookInfo);
      }

      return res.json(book);
    } catch (e) {
      console.error(e);
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteBook(req, res, next) {
    try {
      const { id } = req.params;

      // Проверка существования книги
      const book = await Book.findByPk(id);
      if (!book) {
        throw new ApiError.notFound("Книга не найдена.");
      }

      // Удаление книги
      await book.destroy();

      return res.json({ message: "Книга успешно удалена." });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { genreId, authorId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit; //считаем отступ для страницы N
    let books;
    if (!genreId && !authorId) {
      books = await Book.findAndCountAll({ limit, offset });
    }
    if (genreId && !authorId) {
      books = await Book.findAndCountAll({ where: { genreId }, limit, offset });
    }
    if (!genreId && authorId) {
      books = await Book.findAndCountAll({
        where: { authorId },
        limit,
        offset,
      });
    }
    if (genreId && authorId) {
      books = await Book.findAndCountAll({
        where: { genreId, authorId },
        limit,
        offset,
      });
    }

    return res.json(books);
  }

  async editBook(req, res, next) {
    try {
      const { id } = req.params;

      // Проверка существования книги
      const book = await Book.findByPk(id);
      if (!book) {
        throw new ApiError.notFound("Книга не найдена.");
      }

      // Получение новых данных для книги из тела запроса
      const { name, price, genreId, authorId } = req.body;

      // Обновление данных книги
      await book.update({
        name: name || book.name,
        price: price || book.price,
        genreId: genreId || book.genreId,
        authorId: authorId || book.authorId,
      });

      return res.json(book);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const book = await Book.findOne({
      where: { id },
      include: [{ model: BookInfo, as: "info" }],
    });
    return res.json(book);
  }
}

module.exports = new BookController();
