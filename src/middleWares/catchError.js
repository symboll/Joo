const { Exception } = require('../exception')

const catchError = async(ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (error instanceof Exception) {
      ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode,
        request: `${ctx.method}: ${ctx.path}`
      }
      ctx.status = error.status
    }else {

      ctx.body = {
        msg: error.message,
        errorCode: 9999,
        request: `${ctx.method}: ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}
module.exports = catchError