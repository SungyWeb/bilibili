/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1617964829237_4984';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {

  };

  return {
    ...config,
    ...userConfig,
  };
};
