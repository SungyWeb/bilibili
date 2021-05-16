import { Container } from "react-dom";

function createRootImpl(container) {
  const root = createContainer()
  markContainerAsRoot()
}
function ReactDOMRoot(container: Container) {
  this._internalRoot = createRootImpl(container)
}