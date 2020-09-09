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

  router.get('/api/role/get_resource', controller.role.getResource)  // 获取所有角色-资源
  router.post('/api/role/set_resource', controller.role.setResource)  // 设置角色和资源的关系

  router.get('/api/role/get_user', controller.role.getUser)  // 获取所有角色-用户
  router.post('/api/role/set_user', controller.role.setUser)  // 设置角色和用户的关系

  router.get('/api/captcha', controller.user.captcha)   // 获取验证码
  router.post('/api/check_captcha', controller.user.checkCaptcha)   // 验证验证码

  router.post('/api/signup', controller.user.signup)   // 注册
  router.post('/api/signin', controller.user.signin)   // 登录

};
