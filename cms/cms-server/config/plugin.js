'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  mysql: {
    package: 'egg-mysql',
    enable: true,
  },
  cros: {
    package: 'egg-cors',
    enable: true,
  }
};
