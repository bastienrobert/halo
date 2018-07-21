'use strict'

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const paths = require('../config/paths')

const config = require('../config/webpack.config.dev')

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'

const compiler = webpack(config)
const devServerOptions = Object.assign({}, config.devServer, {
  stats: {
    colors: true
  },
  hot: true,
  contentBase: paths.appPublic,
  clientLogLevel: 'none',
  watchContentBase: true,
  publicPath: config.output.publicPath,
  quiet: true,
  https: protocol === 'https',
  overlay: true,
  open: true
})

const server = new WebpackDevServer(compiler, devServerOptions).listen(
  8080,
  '127.0.0.1',
  () => {
    console.log('Starting server on http://localhost:8080')
  }
)
