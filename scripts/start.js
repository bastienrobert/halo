'use strict'

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'
process.env.PORT = 8080

const webpack = require('webpack')
const opn = require('opn')
const ip = require('ip')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const execSync = require('child_process').execSync

const paths = require('../config/paths')
const config = require('../config/webpack.config.dev')
const appName = require(paths.appPackageJson).name

const bold = chalk.bold
const valid = chalk.bold.green
const progress = chalk.blue
const error = chalk.bold.red
const warning = chalk.keyword('orange')

const clear = () => process.stdout.write('\x1B[2J\x1B[3J\x1B[H')

// On server launch
clear()
console.log(progress('Server is loading...'))

// If darwin (macOS), try to launch AppleScript with Chrome
const shouldTryOpenChromeWithAppleScript = process.platform === 'darwin'

// Message to display on each rebuild
const message = `
You can now view ${bold(appName)} in the browser.

Local:            http://localhost:${bold(process.env.PORT)}/
On Your Network:  http://${ip.address()}:${bold(process.env.PORT)}/

Note that the development build is not optimized.
To create a production build, use yarn build.`

// Add entry points for hot reloading
config.entry = [
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/dev-server',
  ...config.entry
]

// Create compiler using webpack configuration
const compiler = webpack(config)

// After compile
compiler.plugin('done', callback => {
  // Clear the console
  clear()

  // Message after clear
  callback.compilation.errors.length > 0 ||
  callback.compilation.warnings.length > 0
    ? console.log(error('Failed to compile.'))
    : console.log(valid('Compiled successfully!'))
  console.log(message)
})

// Create webpack-dev-server with options
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

// Open the server and new tab
server.listen(process.env.PORT, 'localhost', () => {
  if (shouldTryOpenChromeWithAppleScript) {
    try {
      // Try our best to reuse existing tab
      // on OS X Google Chrome with AppleScript
      execSync(
        `osascript openChrome.scpt "${encodeURI(
          `http://localhost:${process.env.PORT}`
        )}"`,
        {
          cwd: `${__dirname}/helpers`,
          stdio: 'ignore'
        }
      )
      return true
    } catch (err) {
      opn(`http://localhost:${process.env.PORT}`)
    }
  } else {
    opn(`http://localhost:${process.env.PORT}`)
  }
})
