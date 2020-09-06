'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // RESTful  api
  router.resources('user', '/api/user', controller.user)
  router.resources('role', '/api/role', controller.role)
  router.resources('roleUser', '/api/role_user', controller.roleUser)
  router.resources('roleResource', '/api/role_resource', controller.roleResource)
  router.resources('resource', '/api/resource', controller.resource)

  router.get('/api/role/get_resource', controller.role.getResource)  // 获取所有资源
  // router.get('/api/role/set_resource', controller.role.setResource)  // 设置角色和资源的关系

  // router.get('/api/role/get_user', controller.role.getResource)  // 获取所有用户
  // router.get('/api/role/set_user', controller.role.setResource)  // 设置角色和用户的关系
};
