const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

const webpackClientConfig = (isProduction) => ({
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'client.js',
    publicPath: '/',
  },
  watch: !isProduction,
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
        
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
    ],
  },
  optimization: {
    usedExports: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin({
        test: /\.css$/i,
      })
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: isProduction && {
        collapseWhitespace: true
      },
      minifyCSS: true,
      favicon: path.resolve(__dirname, 'src/client/assets/favicon.svg'),
    }),
    new MiniCssExtractPlugin(),
    new HTMLInlineCSSWebpackPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 8003
    // })
  ],
  // stats: 'errors-warnings',
})

const webpackSharedConfig = (isProduction) => ({
  entry: './src/shared.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'shared.js',
  },
  watch: !isProduction,
  optimization: {
    usedExports: true,
  },
  // plugins: [
  //   new BundleAnalyzerPlugin({
  //     analyzerPort: 8002
  //   })
  // ]
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
  }),
  // new BundleAnalyzerPlugin({
  //   analyzerPort: 8001
  // })
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
    webpackSharedConfig(isProduction),
    webpackServerConfig(isProduction)
  ]
};