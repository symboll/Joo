const Router = require('koa-router')
const Home = require('../controller/home')

const router = new Router({ prefix: '/home' })
const home = new Home()

router.get('/', home.index)


module.exports = router