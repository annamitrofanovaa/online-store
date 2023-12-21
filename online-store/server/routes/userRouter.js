const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // Укажите нужный домен или '*' для доступа с любых доменов
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.status(204).send();
  });

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

//router.get('/auth', (reg, res) => {
//  res.json({message: 'ALL WORKING'})
//}) //проверяем авторизирован ли пользователь

//router.get('/auth', userController.check)

module.exports = router