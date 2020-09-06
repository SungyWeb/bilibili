const { Controller } = require('egg')

/**
 * entity 实体的意思 这里表示service下的哪个实例
 * 由子类具体实现
 */
class BaaseController extends Controller {
    success(data = {}) {
        this.ctx.body = {
            code: 0,
            message: 'success',
            data,
        }
    }
    error(message = 'error') {
        this.ctx.body = {
            code: 1,
            message,
        }
    }
    async index() {
        const { ctx, service } = this
        const { pageSize, pageNum, ...where } = ctx.query
        const result = await service[this.entity].list(
            isNaN(pageSize) ? 20 : parseInt(pageSize),
            isNaN(pageNum) ? 1 : parseInt(pageNum),
            where
        )
        this.success(list)
    }
    async create() {
        const { ctx, service } = this
        const entity = ctx.request.body
        const isSuccess = await service[this.entity].create(entity)
        isSuccess ? this.success() : this.error('创建失败')
    }
    async update() {
        const { ctx, service } = this
        const entity = ctx.request.body
        const id = ctx.params.id
        entity.id = id
        const isSuccess = await service[this.entity].update(entity)
        isSuccess ? this.success() : this.error('更新失败')
    }
    async destroy() {
        const { ctx, service } = this
        const id = ctx.params.id
        const isSuccess = await service[this.entity].destroy(id)
        isSuccess ? this.success() : this.error('删除失败')
    }
}

module.exports = BaaseController