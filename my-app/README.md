# 调试记录

1. 暴露webpack配置 `yarn eject`
2. 在`config/webpack.config.js`中配置less
  - 将`scssRegex`和`scssModuleRegex`相关都改为less
3. 按需引入antd
  - `yarn add antd`
  - `yarn add babel-plugin-import` 按需加载必须
  - 在`test:test: /\.(js|mjs|jsx|ts|tsx)$/`中的`plugins`中添加`[require.resolve('babel-plugin-import'), { libraryName: 'antd', style: 'css' }],`
