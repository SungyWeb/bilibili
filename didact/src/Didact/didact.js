import {
  TEXT_ELEMENT,
} from './enum'


function createTextElement(text) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function createElement(type, props, ...children) {
	return {
		type, 
		props: {
      ...props,
      children: children.map(v => {
        return typeof v === 'object' ? v : createTextElement(v)
      }),
    }
	}
}


const Didact = {
	createElement,
}
export default Didact