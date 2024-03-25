// returns true if iframe is same origin, and therefore, can focus its internal elements
function isIframe(node: HTMLElement | HTMLIFrameElement) {
  return node.tagName === 'IFRAME' || node instanceof HTMLIFrameElement
}

function isIframeOfSameOrigin(iframe: HTMLIFrameElement) {
  // if we can access contentDocument (is not null) on the iframe, then it is of same origin
  return !!iframe.contentDocument
}

/**
 * Recursively traverse an active tree and run callback on each non-inert node element.
 *
 * @param {HTMLElement | HTMLIFrameElement} node The starting node to recursively traverse.
 * @param {(node: T) => void} callback Function to call on each node element.
 */
export function traverseActiveTreeRecursively<T extends HTMLElement extends HTMLIFrameElement>(
  node: T,
  callback: (node: T) => void
) {
  if (!node) {
    return
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    // inert is only supported by Chrome for now (behind a flag)
    if (node.hasAttribute('inert')) {
      return
    }
    if (isIframe(node)) {
      if (isIframeOfSameOrigin(node)) {
        // for a same-origin iframe, we don't want to include the
        // iframe itself in the list, since we can see any of the
        // frames focusable children. So, skip calling callback on
        // the iframe node, and proceed to traverse it's children.
        traverseActiveTreeRecursively(
          node.contentDocument,
          callback
        )
      } else {
        // a non same-origin iframe is totally opaque, so include the
        // iframe in the results, but do no try to traverse into the
        // iframes children
        if (callback) {
          callback(node)
        }
      }
      return
    }
    if (callback) {
      callback(node)
    }
    // If the element has a shadow root, traverse that
    if (node.shadowRoot) {
      // test these work as expected on platform
      traverseActiveTreeRecursively(node.shadowRoot, callback)
      return
    }
    // if it's a slot element, get all assigned nodes and traverse them
    if (node.localName === 'slot') {
      const slottedNodes = node.assignedNodes({ flatten: true })
      for (const node of slottedNodes) {
        traverseActiveTreeRecursively(node, callback)
      }
      return
    }
  }
  let child = node.firstChild
  while (child !== null) {
    traverseActiveTreeRecursively(child, callback)
    child = child.nextSibling
  }
}
