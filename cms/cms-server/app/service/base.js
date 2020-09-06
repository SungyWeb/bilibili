const { Service } = require('egg')
/**
 * this.entity 这里表示数据库表名 由子类具体实现
 */
class BaseService extends Service {
    async list(pageSize, pageNum, where) {
        const list = await this.app.mysql.select(this.entity, {
            where,
            order: [['id', 'asc']],
            offset: (pageNum - 1) * pageSize,
            limit: pageSize,
        })
        const count = await this.app.mysql.count(this.entity, where)
        return {
            count,
            list,
        }
    }
    async create(entity) {
        const result = await this.app.mysql.insert(this.entity, entity)
        return result.affectedRows > 0
    }
    async update(entity) {
        const result = await this.app.mysql.update(this.entity, entity)
        return result.affectedRows > 0
    }
    async destroy(id) {
        const result = await this.app.mysql.delete(this.entity, { id })
        return result.affectedRows > 0
    }
}

module.exports = BaseService