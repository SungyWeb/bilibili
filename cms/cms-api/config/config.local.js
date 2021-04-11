
module.exports = {
  mysql: {
    client: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '123@mysql.com',
      database: 'cms',
    },
    app: true,
  },
  security: {
    csrf: false,
  },
};
