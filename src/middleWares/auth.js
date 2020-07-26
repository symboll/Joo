const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken')
const { Exception } = require('../resModel');
const { security: { key }} = require('../config')

class Auth {
  constructor () {

  }
  async check (ctx, next) {
    const token = basicAuth(ctx.req)
    let decode;
    if(token && token.name) {
      try{
        decode = jwt.verify(token.name, key )
        ctx.auth = {
          uid: decode.uid,
          scope: decode.scope
        }
      }catch (err) {
        if(err.name == 'TokenExpiredError') {
          throw new Exception('token已经过期', 403)
        }
        throw new Exception('token不合法', 403)
      }
    } else {
      throw new Exception('禁止访问',403)
    }

    await next()
  }
}

module.exports = Auth;