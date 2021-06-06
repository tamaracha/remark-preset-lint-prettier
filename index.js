'use strict'
const { optionalDependencies } = require('./package.json')

const plugins = Object.keys(optionalDependencies)
  .filter((dep) => dep.startsWith('remark-lint-'))
  .reduce((plugins, dep) => {
    try {
      const plugin = require(dep)
      plugins.push([plugin, false])
    } catch {}
    return plugins
  }, [])

module.exports = { plugins }
