/**
 * Base webpack config to be used if the user doesn't provide their own configuration
 */
import path from 'path'

import LwcWebpackPlugin from '@lukethacoder/lwc-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import lwcBabelPlugin from '@lwc/babel-plugin-component'

import babelPresetTypeScript from '@babel/preset-typescript'

import { __dirname } from './constants.js'

const webpackConfig = (gardenConfig) => ({
  mode: 'development',
  target: 'web',
  entry: {
    app: path.join(gardenConfig.cacheDir, './config/index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.join(gardenConfig.rootDir, './dist'),
  },
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: false,
    publicPath: false,
  },
  devServer: {
    hot: true,
    allowedHosts: 'all',
    client: {
      logging: 'error',
    },
  },
  plugins: [
    new LwcWebpackPlugin({
      rootDir: `${gardenConfig.rootDir}/`,
      experimentalDynamicComponent: true,
      experimentalDynamicDirective: true,
      enableDynamicComponents: true,
    }),
    {
      apply(compiler) {
        compiler.options.module.rules.push({
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: path.join(__dirname, 'babel-loader.js'),
            options: {
              // explicit import instead of a string import so consumers do not need to install '@babel/preset-typescript'
              presets: [[babelPresetTypeScript]],
              plugins: [lwcBabelPlugin],
            },
          },
        })
      },
    },
    new HtmlWebpackPlugin({
      template: path.join(gardenConfig.cacheDir, './config/index.html'),
    }),
  ],
  resolve: {
    alias: {
      // TODO: allow garden.config.js to pass alias config without needing to configure the entire webpack config
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
})

export default webpackConfig
