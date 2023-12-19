const Router = require('express')
const router = new Router()
const deviceRouter = require('./bookRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./genreRouter')
const typeRouter = require('./authorRouter')
const adminRouter = require('./adminRouter')
//const authRouter = require('./authRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
//router.use('/auth', authRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/admin', adminRouter)

module.exports = router