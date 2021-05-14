
const randomKey = Math.random()
.toString(36)
.slice(2);
const internalInstanceKey = '__reactFiber$' + randomKey;
const internalPropsKey = '__reactProps$' + randomKey;
const internalContainerInstanceKey = '__reactContainer$' + randomKey;

export function markContainerAsRoot(hostRoot, node) {
  node[internalContainerInstanceKey] = hostRoot;
}
