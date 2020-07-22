class Home {
  async index (ctx, next) {
    ctx.body = { status: 0, data: ['ss','哈哈'] }
  }

}

module.exports = Home