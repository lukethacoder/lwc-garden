import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

export async function startWebpack(webpackConfig) {
  // Run the local server (webpack)
  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(webpackConfig.devServer, compiler)

  const runServer = async () => {
    await server.start()
  }

  await runServer()
}
