require('module-alias/register')
const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const catchError = require('./src/middleWares/catchError.js')
const routing = require('./src/routers')

const app = new Koa();
app.use(bodyParser());
app.use(catchError);
app.use(static(path.join(__dirname, 'static')));
routing(app);


app.listen(8000);