const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

//router.get('/auth', (reg, res) => {
//  res.json({message: 'ALL WORKING'})
//}) //проверяем авторизирован ли пользователь

//router.get('/auth', userController.check)

module.exports = router