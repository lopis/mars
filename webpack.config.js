const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const path = require('path');

const webpackClientConfig = (isProduction) => ({
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'client.js',
  },
  watch: !isProduction,
  module: {
    rules: [
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //     },
      //   ],
      // },
      {
        test: /\.css$/i,
        use: [
          // The `injectType`  option can be avoided because it is default behaviour
          {
            loader: "style-loader",
            options: { 
              insert: 'head', // insert style tag inside of <head>
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: isProduction && {
        collapseWhitespace: true
      },
      minifyCSS: true,
      inlineSource: isProduction && '\.(js|css)$'
    }),
  ],
  // stats: 'errors-warnings',
})

const serverPlugins = [
  new WebpackShellPluginNext({
    onDoneWatch:{
      scripts: [
        'echo "Shutting server down"',
        'pkill -f "\\--game"',
        'echo "Starting server"',
        'node index.js --game'
      ],
      parallel: true
    },
  })
]

const webpackServerConfig = (isProduction) => ({
  entry: './src/server.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'server.js',
    library: {
      // Export an nmp module with proper exports
      type: 'commonjs',
    },
  },
  devtool: isProduction ? false : 'source-map',
  watch: !isProduction,
  plugins: isProduction ? [] : serverPlugins
})

module.exports = (env, argv) => {
  isProduction = argv.mode === 'production'

  return [
    webpackClientConfig(isProduction),
    webpackServerConfig(isProduction)
  ]
};