module.exports = app => {
  const { router, controller } = app;
  router.resources('users', '/api/users', controller.user);
  router.get('/', controller.home.index);
};
