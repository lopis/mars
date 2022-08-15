const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const webpackClientConfig = (isProduction) => ({
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'client.js',
  },
  watch: !isProduction,
  // module: {
  //   rules: [
  //     {
  //       test: /\.(png|jpe?g|gif|svg)$/i,
  //       use: [
  //         {
  //           loader: 'file-loader',
  //         },
  //       ],
  //     },
  //   ],
  // },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: isProduction && {
        collapseWhitespace: true
      },
      inlineSource: isProduction && '\.(js|css)$'
    })
  ],
  // stats: 'errors-warnings',
})

const webpackServerConfig = (isProduction) => ({
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'server.js',
  },
  watch: !isProduction,
})

module.exports = (env, argv) => {
  isProduction = argv.mode === 'production'

  return [
    webpackClientConfig(isProduction),
    webpackServerConfig(isProduction)
  ]
};