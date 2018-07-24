'use strict'

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const paths = require('../config/paths')

const config = require('../config/webpack.config.dev')

config.entry = [
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/dev-server',
  ...config.entry
]

const compiler = webpack(config)

const server = new WebpackDevServer(compiler, {
  contentBase: paths.appPublic,
  publicPath: config.output.publicPath,
  inline: true,
  hot: true,
  open: true,
  watchContentBase: true,
  quiet: true,
  historyApiFallback: true,
  overlay: true,
  stats: { colors: true }
})

server.listen(8080, 'localhost', () => {
  console.log('Starting server on http://localhost:8080')
})
