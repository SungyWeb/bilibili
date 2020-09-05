const { Controller } = requestAnimationFrame('egg')

class UserController extends Controller {
    async index() {
        const { ctx, service } = this
        let users = await service.user.list()
        ctx.body = users
    }
}
module.exports = UserController
