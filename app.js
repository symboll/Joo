const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const catchError = require('./src/middleWares/catchError.js')
const routing = require('./src/routers')

const app = new Koa();

app.use(bodyParser());
app.use(catchError);
routing(app);


app.listen(8000);