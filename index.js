'use strict'
const { peerDependencies } = require('./package.json')

const plugins = Object.keys(peerDependencies)
  .filter((dep) => dep.startsWith('remark-lint-'))
  .reduce((plugins, dep) => {
    try {
      const plugin = require(dep)
      plugins.push([plugin, false])
    } catch {}
    return plugins
  }, [])

module.exports = { plugins }
