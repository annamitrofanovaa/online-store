const Router = require('express')
const router = new Router()
const bookRouter = require('./bookRouter')
const userRouter = require('./userRouter')
const genreRouter = require('./genreRouter')
const authorRouter = require('./authorRouter')
const adminRouter = require('./adminRouter')
//const authRouter = require('./authRouter')

router.use('/user', userRouter)
router.use('/author', authorRouter)
//router.use('/auth', authRouter)
router.use('/genre', genreRouter)
router.use('/book', bookRouter)
router.use('/admin', adminRouter)

module.exports = router