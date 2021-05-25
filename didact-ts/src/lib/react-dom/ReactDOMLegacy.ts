import { ReactNodeArray } from "prop-types"
import React from "react"
import { Container, Renderer } from "react-dom"

function legacyCreateRootFromDOMContainerf(container, forceHydrate) {
  return new ReactDOMRoot(container)
}

function legacyRenderSubtreeIntoContainer(parentComponent: null, children: JSX.Element | JSX.Element[], container: Container, forceHydrate: boolean, callback?: any) {
  let root = container?._reactContainer
  let fiberRoot: any
  if()
  root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate)
  fiberRoot = root._internalRoot
  updatContainer(children, fiberRoot)

  return root
}

const render = function (element: JSX.Element, container: Container, callback?: any) {
  return legacyRenderSubtreeIntoContainer(null, element, container,false, callback)
}


export {
  render
}