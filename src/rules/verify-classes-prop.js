const isBreakpointValid = (breakpoint, classString, node, context) => {
  const allBreakpoints = ['sm', 'md', 'lg']
  const breakpointRegex = new RegExp(`${breakpoint}:(.+?);`) // new

  const breakpointMatches = breakpointRegex.exec(classString)
  if (!breakpointMatches) return true // return if nothing was found in parse

  // if you are parsing for md for example and you find a lg, it is probably because
  // the md statement wasn't terminated, this  forEach checks to make
  allBreakpoints.forEach((currBreakpoint) => {
    if (breakpoint !== currBreakpoint) {
      if (breakpointMatches[1].includes(`${currBreakpoint}:`)) {
        context.report({
          node,
          message: `Found ${currBreakpoint} while parsing for ${breakpoint}, you may be missing a semi-colon.`,
        })
        return false
      }
    }
  })

  // this is to check for if the last statement in the classes was terminated correctly.
  // if breakpoint is found in string, but it was not able to find the classes,
  // then that means it was formatted incorrectly
  if (classString.includes(`${breakpoint}:`) && breakpointMatches === null) {
    context.report({
      node,
      message: `You have an ${breakpoint}: tag, but you didn't close with a semi-colon.`,
    })
    return false
  }

  return true
}

module.exports = {
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name === 'classes') {
          const string = node.value.value

          isBreakpointValid('sm', string, node, context)
          isBreakpointValid('md', string, node, context)
          isBreakpointValid('lg', string, node, context)
        }
      },
    }
  },

  meta: {
    docs: { url: 'test.com' },
    type: 'suggestion',
  },
}
