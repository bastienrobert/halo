'use strict'

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'
process.env.PORT = 8080

const webpack = require('webpack')
const opn = require('opn')
const ip = require('ip')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')

const paths = require('../config/paths')
const config = require('../config/webpack.config.dev')
const appName = require(paths.appPackageJson).name

const bold = chalk.bold
const valid = chalk.bold.green
const error = chalk.bold.red
const warning = chalk.keyword('orange')
const message = `
You can now view ${bold(appName)} in the browser.

Local:            http://localhost:${bold(process.env.PORT)}/
On Your Network:  http://${ip.address()}:${process.env.PORT}/

Note that the development build is not optimized.
To create a production build, use yarn build.`

config.entry = [
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/dev-server',
  ...config.entry
]

const compiler = webpack(config)

compiler.plugin('done', callback => {
  // Clear the console
  const clear = '\x1B[2J\x1B[3J\x1B[H'
  const output = this.message ? clear + this.message + '\n\n' : clear
  process.stdout.write(output)

  callback.compilation.errors.length > 0 ||
  callback.compilation.warnings.length > 0
    ? console.log(error('Failed to compile.'))
    : console.log(valid('Compiled successfully!'))
  console.log(message)
})

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

server.listen(process.env.PORT, 'localhost', () => {
  opn('http://localhost:8080')
})
