import { ELEMENT_TEXT } from './enums'

function createElement(type, config, ...children) {
  return {
    type,
    props: {
      ...config,
      children: children.map(v => {
        return typeof v === 'object' ? v : { type: ELEMENT_TEXT, props: { text: v, children: [] } }
      })
    },

  }
}

export default {
  createElement,
}