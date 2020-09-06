const BaseService = require('./base')
const TableName = 'role'
function listToTree(list) {
    const map = {}
    const root = []
    resource.forEach(v => {
        v.children = []
        map[v.id] = v
        if (v.parent_id === 0) {
            root.push(v)
        } else {
            map[v.parent_id].children.push(v)
        }
    })
    return root
}
class RoleService extends BaseService {
    constructor(...args) {
        super(...args)
        this.entity = TableName
    }
    async getResource() {
        const { app } = this
        const resource = await app.mysql.select('resource')
        return listToTree(resource)
    }
}

module.exports = RoleService