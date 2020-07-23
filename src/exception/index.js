class Exception extends Error {
  constructor (msg = '服务器异常', errorCode = 10000, status=400) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.status = status          // 状态码
  }
}


module.exports = {
  Exception
}