const BaaseController = require('./base')
const svgCaptcha = require('svg-captcha')
const Jwt = require('jsonwebtoken')
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
  async signup() {
    const { ctx, app } = this
    const user = ctx.request.body
    const result = await app.mysql.insert('user', user)
    if(result.affectedRows > 0) {
      this.success({
        id: result.insertId
      })
    }else {
      this.error('注册失败')
    }
  }
  async signin() {
    const { ctx, app } = this
    const {username, password} = ctx.request.body   // {username, password}
    const result = await app.mysql.select('user', {
      where: {username, password},
      limit: 1,
    })
    if(result && result.length > 0) {
      const user = JSON.parse(JSON.stringify(result[0]))
      Reflect.deleteProperty(user, 'password')
      this.success(Jwt.sign(user, this.config.jwtSecret))
    }else {
      this.error('登录失败')
    }
  }
}

module.exports = UserController