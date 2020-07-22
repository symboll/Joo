const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const routing = require('./src/routers')

const app = new Koa();


routing(app);
app.use(bodyParser());



app.listen(8000)