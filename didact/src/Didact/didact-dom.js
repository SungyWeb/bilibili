import {TEXT_ELEMENT} from './enum'

const isProperty = key => key !== 'children'

function createTextNode(element) {
  return document.createTextNode('')
}

function createDomElement(element, parent) {
  const dom = element.type === TEXT_ELEMENT ? createTextNode(element) : document.createElement(element.type)

  Object.keys(element.props)
    .filter(isProperty)
    .forEach(attrName => {
      dom[attrName] = element.props[attrName]
    })

  parent.appendChild(dom)
  element.props.children.forEach(child => {
    createDomElement(child, dom)
  })
}

function render(element, container) {
  const fragment = document.createDocumentFragment()
  createDomElement(element, fragment)
  container.appendChild(fragment)
}


const DidactDOM = {
  render,
}
export default DidactDOM