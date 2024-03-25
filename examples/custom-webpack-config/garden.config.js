import path from 'path'
import { fileURLToPath } from 'url'

import THEME from '@lwc-garden/core/themes/orange.js'
import LwcWebpackPlugin from '@lukethacoder/lwc-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import lwcBabelPlugin from '@lwc/babel-plugin-component'

import lwcConfig from './lwc.config.json' assert { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const WEBPACK_CONFIG = {
  mode: 'development',
  target: 'web',
  entry: {
    app: `./config/index.js`,
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
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
    client: {
      logging: 'error',
    },
  },
  plugins: [
    new LwcWebpackPlugin({
      rootDir: `${process.cwd()}/`,
      modules: [
        {
          dir: path.resolve(__dirname, '.garden/components'),
          namespace: 'garden',
        },
        {
          dir: path.resolve(__dirname, './shared-components'),
          namespace: 'example',
        },
      ],
      experimentalDynamicComponent: false,
      experimentalDynamicDirective: false,
      enableDynamicComponents: true,
    }),
    {
      apply(compiler) {
        compiler.options.module.rules.push({
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-typescript']],
              plugins: [lwcBabelPlugin],
            },
          },
        })
      },
    },
    new HtmlWebpackPlugin({
      template: './config/index.html',
    }),
  ],
  resolve: {
    symlinks: false,
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
}

/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
const CONFIG = {
  // rootDir: './',
  // uses minimatch
  ignore: ['./__mocks__/**'],
  // lwc.config.json modules type
  modules: lwcConfig.modules,
  theme: THEME,
  // standard webpack config
  webpack: WEBPACK_CONFIG,
}

export default CONFIG
