const Router = require('koa-router')
const Book = require('../controller/book')

const router = new Router({ prefix: '/book' })
const book = new Book()


router.post('/hotlist', book.hotlist)

// 书籍详情
router.post('/:id/detail', book.detail)

module.exports = router