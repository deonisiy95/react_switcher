const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = () => (process.env.NODE_ENV || 'development') === 'development';

module.exports = {
  entry: './src/index.tsx',
  output: {path: path.join(__dirname, 'build'), filename: 'index.bundle.js'},
  mode: process.env.NODE_ENV || 'development',
  devtool: isDevelopment() ? 'cheap-module-source-map' : false,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        type: 'asset'
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: "css-loader", options: { modules: true } },
          { loader: 'sass-loader' },
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters(compilation, assets, options) {
        return {
          compilation: compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options: options
          },
          process
        };
      },
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },
      isBrowser: false,
      isDevelopment: process.env.NODE_ENV !== 'production',
      nodeModules:
        process.env.NODE_ENV !== 'production' ? path.resolve(__dirname, '../node_modules') : false
    })
  ]
};
