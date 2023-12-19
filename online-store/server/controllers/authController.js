// controllers/authController.js
/*
const { User } = require('../models/models'); // Путь к вашим моделям

class AuthController {
  async login(req, res) {
    try {
      // Предположим, что user.id содержит идентификатор пользователя
      //const userId = user.id;
      const userId = 12;

      // Сохранение идентификатора пользователя в сессии
      req.session.userId = userId;

      // Отправка ответа
      res.json({ message: 'Вход выполнен успешно' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }
}

module.exports = new AuthController();
*/