const { Controller } = require('egg');

class UserController extends Controller {
  async index() {
    const { ctx, service } = this;
    const users = await service.user.list();
    ctx.body = users;
  }
}
module.exports = UserController;
