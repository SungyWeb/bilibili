import { ELEMENT_TEXT } from './constants'


/**
 * 创建元素（创建虚拟dom）的方法
 * @param {string} type 元素类型 div/span/p ...
 * @param {object} config 配置对象
 * @param  {object[]} children 所有的自元素 简化为一个数组
 */
function createElement(type, config, ...children) {
  delete config.__self
  delete config.__source
  return {
    type,
    props: {
      ...config,
      children: children.map(child => {
        return typeof (child) === 'object' ? child : {
          type: ELEMENT_TEXT,
          props: {
            text: child,
            children: []
          }
        }
      }),
    }
  }
}

const React = {
  createElement,
}

export default React
