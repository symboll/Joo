const jwt  = require('jsonwebtoken')

const { security: {
  expiresIn,
  key
}} = require('../config')

const getToken = (uid, scope) => {
  return jwt.sign({
    uid,
    scope
  },key, {
    expiresIn
  })
}

module.exports = getToken