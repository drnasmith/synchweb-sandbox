const path = require('path');
const webpack = require("webpack");
const childProcess = require('child_process')
// As of v3.0.3 GitRevisionPlugin does not work with MiniCssExtractPlugin
// const GitRevisionPlugin = require('git-revision-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// These steps remove the need for a separate plugin to set the githash
const gitHash = childProcess.execSync('git rev-parse --short HEAD').toString().trim();
const config = require('./src/js/config.json')

module.exports = (env, argv)  => {
  return({
    entry: {
      main: './src/index.js',
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist', gitHash),
    publicPath: path.join('/dist', gitHash, '/'),
  },
  devServer: {
    // contentBase: [
    //   path.join(__dirname, 'dist', gitHash),
    //   path.join(__dirname, '.')
    // ],
    port: 9000,
    historyApiFallback: {
      index: '/dist/'+gitHash+'/index.html',
    },
    // publicPath: path.join(__dirname),
    proxy: {
      '/api': {
        // Change this target to where SynchWeb server is running
        target: 'http://192.168.33.10',
        // Intercept the request and add auth header
        onProxyReq: function(proxyReq, req, res) {
          if (req.headers.authorization) {
            proxyReq.setHeader('Authorization', req.headers.authorization);
          }
        },
        secure: false,
      },
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    alias: {
      // Vue packages from npm (vee-validate requires promise polyfill - also npm)
      vue: 'vue/dist/vue',
      'underscore': 'underscore',
      'marionette': 'backbone.marionette',

      'jquery.touchswipe': 'jquery-touchswipe',
      'jquery-ui.timepicker': 'jquery-ui-timepicker-addon', // Need to update timepicker css to avoid showing microseconds/milliseconds      
      // Jquery-ui-combox is based on an extension from npm
      // The original was based on a collection of extensions: (https://github.com/bseth99/jquery-ui-extensions)
      // Currently using a modified version from npm
      'jquery-ui.combobox': 'vendor/jquery/jquery-ui.combobox.custom',
      // 'jquery-ui.combobox': 'vendor/jquery/jquery-ui.combobox',

      // Jquery.flot provided by NPM package (exact name match)
      // Jquery.flot.resize also from NPM but slightly older version 1.0.0 2012 instead of 2013 (vendor lib)
      'jquery.flot.resize': 'jquery-flot-resize', 
      'jquery.flot.pie': 'flot-pie',
      'jquery.flot.time': 'vendor/flot/jquery.flot.time.min',
      'jquery.flot.selection': 'vendor/flot/jquery.flot.selection',
      'jquery.flot.stack': 'vendor/flot/jquery.flot.stack',

       // Jquery flot tooltip is provided ny NPM with exact name match,
       // so not aliased here, was: 'vendor/flot/jquery.flot.tooltip',
      'jquery.flot.tickrotor': 'vendor/flot/jquery.flot.tickrotor',
      'jquery.flot.axislabels': 'flot-axislabels',
      
      // We can't currently use the magnific-popup from npm e.g.:
      // 'jquery.mp': 'magnific-popup',
      // The vendor library has been modified to append proposal to the request
      // Hence the vendor magnific-popup has a dependency on our utils/xhrimage
      'jquery.mp': 'vendor/jquery/jquery.magnific-popup',

      // jeditable can be provided by NPM (but only for jQuery 3.x). Does not work with our legacy jquery.
      // 'jquery.editable': 'jquery-jeditable/dist/jquery.jeditable.min',
      // 'jquery.editable.datepicker': 'jquery-jeditable/dist/jquery.jeditable.datepicker.min',
      'jquery.editable': 'vendor/jquery/jquery.jeditable.min',
      'jquery.editable.datepicker': 'vendor/jquery/jquery.jeditable.datepicker',

      // Jquery.color plugin also NPM package
      // Only used from within utils.js
      'jquery.color': 'jquery-color',
      // Caman npm depends on fibers, canvas, fs which we don't want...
      // So use direct downloaded dependency
      caman: 'vendor/caman.min',

      // heatmap in npm has dependency on canvas/node-gyp... so use old one for now
      heatmap: 'vendor/hmap',
      
      // gunzip is actually the zlib library
      // https://npm.taobao.org/package/zlibjs
      gzip: 'zlibjs/bin/gunzip.min',

      markdown: 'markdown/lib/markdown',

      highmaps: 'highcharts/highmaps',
      'highmaps-world': '@highcharts/map-collection/custom/world',
    },
    modules: [
      path.resolve(__dirname, 'src/js'),
      path.resolve(__dirname, 'src/css'),
      path.resolve(__dirname, 'node_modules'),
    ]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'underscore-template-loader',
            options: {
              engine: 'underscore',
            }
          }
        ],
        exclude: [
          path.resolve(__dirname, 'src/js/templates/vue')
        ]
      },
      // Font loader - url should be relative to entry main.scss file
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../../assets/fonts', // output path is relative to main module outputPath
            publicPath: '/assets/fonts'
          }
        }
      },
      // SVG could be images or fonts so use more explicit test here...
      {
        test: /font-awesome\/.+\.(svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../../assets/fonts',
            publicPath: '/assets/fonts'
          }
        }
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // Extract the CSS into separate files
          { 
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: argv.mode === 'development',
              // reloadAll: true,
            }
          },
          "css-loader", // translates CSS into CommonJS
          "postcss-loader",
        ]
      },
      {
        test: /\.(png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096, // Anything less than this limit is inlined
              name: '[path][name].[ext]',
              outputPath: '../../assets',
              publicPath: '/assets',
              context: 'src',
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
       _: "underscore",
       $: "jquery",
       jQuery: "jquery",
   }),

    new HtmlWebpackPlugin({
      title: 'SynchWeb Webpack',
      filename: path.resolve(__dirname, 'dist/', gitHash, 'index.html'),
      template: 'src/index.html',
    }),
    // Copy static assets to the assets folder
    // Anything matching in the from path is copied so images/file.png => assets/images/file.png
    new CopyPlugin([
      // { context: path.resolve(__dirname, 'src/css/stylesheets'),
      //   from: 'images/**',
      //   to: path.resolve(__dirname, 'assets') },
      { context: path.resolve(__dirname, 'src'),
        from: 'images/**',
        to: path.resolve(__dirname, 'assets') }
    ]),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // Allow use to use process.env.NODE_ENV in the build
    // NODE_ENV should be set in scripts for production builds
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ]
})}
