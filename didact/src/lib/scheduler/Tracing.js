let interactionsRef = null
let subscriberRef = null

interactionsRef = {
  current: new Set(),
}
subscriberRef = {
  current: null,
}

export {interactionsRef as __interactionsRef, subscriberRef as __subscriberRef}
