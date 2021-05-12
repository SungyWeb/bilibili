import {
  TEXT_ELEMENT,
} from './enum'

function Componemt (props, context, updater) {
  this.props = props
  this.context = context
  this.updater = updater
  this.refs = {}
}

Componemt.prototype.isReactComponent = {}
Componemt.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback)
}
Componemt.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
}


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
  Componemt,
}
export default Didact