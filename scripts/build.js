'use strict'

process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

process.on('unhandledRejection', err => {
  throw err
})

const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const paths = require('../config/paths')

const config = require('../config/webpack.config.prod')

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024

fs.emptyDirSync(paths.appBuild)
copyPublicFolder()
build()

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}

function build() {
  const compiler = webpack(config)
  compiler.run((err, stats) => {
    if (err) {
      return reject(err)
    }
  })
}
