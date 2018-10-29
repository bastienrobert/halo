'use strict'

process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

process.on('unhandledRejection', err => {
  throw err
})

const fs = require('fs-extra')
const webpack = require('webpack')
const paths = require('../config/paths')

const config = require('../config/webpack.config.prod')

fs.emptyDirSync(paths.appBuild)
copyPublicFolder()
build()

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  })
}

function build() {
  const compiler = webpack(config)
  compiler.run((err, stats) => {
    if (err) {
      return reject(err)
    }
  })
}
