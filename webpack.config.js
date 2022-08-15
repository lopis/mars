const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
  isProduction = argv.mode === 'production'

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
            },
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
        inlineSource: isProduction && '\.(js|css)$'
      })
    ],
    // stats: 'errors-warnings',
  }
};