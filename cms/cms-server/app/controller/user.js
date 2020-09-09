const BaaseController = require('./base')
const svgCaptcha = require('svg-captcha')
const ServiceName = 'user'
class UserController extends BaaseController {
  constructor(...args) {
    super(...args)
    this.entity = ServiceName
  }
  async captcha() {
    // 获取验证码
    const { ctx } = this
    const captcha = svgCaptcha.create()   // {text: xx, data:svg数据}
    ctx.session.captcha = captcha.text
    ctx.set('Content-Type', 'image/svg-xml')
    ctx.body = captcha.data
  }
  async checkCaptcha() {
    // 验证验证码
    const { ctx } = this
    const captcha = ctx.request.body.captcha
    if (captcha === ctx.session.captcha) {
      ctx.body = '验证成功'
    } else {
      ctx.body = '验证失败'
    }
  }
}

module.exports = UserController