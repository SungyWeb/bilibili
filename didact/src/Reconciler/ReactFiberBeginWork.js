import {HostRoot} from "./ReactWorkTags"
import { REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE } from '../shared/ReactSymbols'
import { createFiberFromElement } from './ReactFiber'
import { Placement } from './ReactFiberFlags'


let didReceiveUpdate = false

function ChildReconciler(shouldTrackSideEffects) {

  function placeSingleChild(newFiber) {
    if (shouldTrackSideEffects && newFiber.alternate === null) {
      newFiber.flags = Placement;
    }
    return newFiber
  }

  function reconcileSingleElement(returnFiber, currentFirstFiber, element, lanes) {
    let child = currentFirstFiber
    while(child !== null) {

    }
    if(element.type === REACT_FRAGMENT_TYPE) {
      // const created = createFiberFromFragment(
      //   element.props.children,
      //   returnFiber.mode,
      //   lanes,
      //   element.key,
      // );
      // created.return = returnFiber;
      // return created;
    }else {
      const created = createFiberFromElement(element, returnFiber.mode, lanes);
      // created.ref = coerceRef(returnFiber, currentFirstChild, element);
      created.ref = null
      created.return = returnFiber;
      return created;
    }
  }
  function reconcileChildFibers(returnFiber, currentFirstFiber, newChild, lanes) {
    const isObject = typeof newChild === 'object' && newChild !== null
    if(isObject) {
      switch(newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstFiber, newChild, lanes))
      }
    }
  }
  return reconcileChildFibers
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);

export function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
  if(current === null) {
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes,
    )
  }else {
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes,
    )
  }
}


function updateHostRoot(current, workInProgress, renderLanes) {
  const nextProps = workInProgress.memoizedProps
  const prevState = workInProgress.memoizedState
  const prevChildren = prevState !== null ? prevState.element : null
  processUpdateQueue(workInProgress, props, instance, renderLanes)
  const nextState = workInProgress
  const nextChildren = nextState.element
  reconcileChildren(current, workInProgress, nextChildren, renderLanes)
  return workInProgress.child
}

function beginWork(current, workInProgress, renderLanes) {
  if(current !== null) {
    let oldProps = current.memoizedProps
    let newProps = workInProgress.pendingProps

    if(oldProps !== newProps) {
      didReceiveUpdate = true
    }else {
      if(false) {
        // update
        didReceiveUpdate = true
      }else {
        didReceiveUpdate = false
      }
    }
  }else {
    didReceiveUpdate = false
  }

  switch(workInProgress.tag) {
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes)
  }
}

export { beginWork }