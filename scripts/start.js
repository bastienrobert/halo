'use strict'

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const opn = require('opn')
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
  noInfo: true,
  historyApiFallback: true,
  progress: true,
  stats: 'minimal'
})

server.listen(8080, 'localhost', () => {
  opn('http://localhost:8080')
  console.log('Starting server on http://localhost:8080')
})
