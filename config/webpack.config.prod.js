const webpack = require('webpack')

const autoprefixer = require('autoprefixer')
const path = require('path')
const paths = require('./paths')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const getClientEnvironment = require('./env')

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath

// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './'

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1)
const env = getClientEnvironment(publicUrl)

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.')
}

const cssFilename = 'static/css/[name].[hash:8].css'

const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {}

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  mode: process.env.NODE_ENV,
  bail: true,
  devtool: shouldUseSourceMap ? 'source-map' : false,
  entry: [require.resolve('./polyfills'), paths.appIndexJs],
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      src: path.resolve(paths.appSrc),
      locales: path.resolve(paths.appSrc, 'locales'),
      app: path.resolve(paths.appSrc, 'app'),
      config: path.resolve(paths.appSrc, 'config'),
      components: path.resolve(paths.appSrc, 'components'),
      values: path.resolve(paths.appSrc, 'values'),
      utils: path.resolve(paths.appSrc, 'utils'),
      helpers: path.resolve(paths.appSrc, 'utils/helpers')
    }
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-react',
                  {
                    pragma: 'h'
                  }
                ]
              ],
              compact: true
            }
          }
          // {
          //   loader: 'eslint-loader',
          //   options: { emitWarning: true }
          // }
        ],
        exclude: /node_modules/,
        include: paths.appSrc
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: {
                loader: require.resolve('style-loader'),
                options: {
                  hmr: false
                }
              },
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    modules: true,
                    sourceMap: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: shouldUseSourceMap,
                    alias: {
                      src: path.resolve(__dirname, '../src')
                    }
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    includePaths: ['./src'],
                    data: '@import "config.scss";'
                  }
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9'
                        ],
                        flexbox: 'no-2009'
                      })
                    ]
                  }
                }
              ]
            },
            extractTextPluginOptions
          )
        )
      },
      {
        loader: require.resolve('file-loader'),
        // Exclude `js` files to keep "css" loader working as it injects
        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.scss$/],
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CaseSensitivePathsPlugin(),
    new ExtractTextPlugin({
      filename: cssFilename
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return null
        }
        if (message.indexOf('Skipping static resource') === 0) {
          return null
        }
        console.log(message)
      },
      minify: true,
      navigateFallback: publicUrl + '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: shouldUseSourceMap,
        warningsFilter: true
      })
    ]
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
