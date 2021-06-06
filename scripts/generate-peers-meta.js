#!/usr/bin/env node
'use strict'
const { writeFileSync } = require('fs')
const { peerDependencies } = require('../package.json')

const peers = Object.keys(peerDependencies)
  .filter((peer) => peer.startsWith('remark-lint-'))
  .map((peer) => [peer, { optional: true }])
const json = JSON.stringify(Object.fromEntries(peers), null, 2)
writeFileSync('peers-meta.json', json)
