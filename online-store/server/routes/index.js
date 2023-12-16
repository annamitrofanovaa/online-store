const Router = require('express')
const router = new Router()
const deviceRouter = require('./bookRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./genreRouter')
const typeRouter = require('./authorRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)

module.exports = router