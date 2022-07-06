const path = require('path');
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cacheParam = new Date().getTime().toString();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Sass = require('sass');

module.exports = {
  mode: process.env.NODE_ENV,
  context: src,
  entry: {
    app: './index.js',
  },
  output: {
    path: dist,
    filename: 'js/[name].bundle.js?[chunkhash:7]',
  },
  devServer: {
    open: true,
    contentBase: src,
    inline: true,
    hot: true,
    watchContentBase: true,
    port: 3000,
  },
  resolve: {
    modules: [src, 'node_modules'],
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /(\.s[ac]ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: {url: false}},
          {loader: 'postcss-loader'},
          {
            loader: 'sass-loader',
            options: {
              implementation: Sass,
            },
          },
        ],
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: '3.8',
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(src, 'assets'),
          to: path.resolve(dist, 'assets'),
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', '**/.gitkeep'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      cacheParam: '?ver=' + cacheParam,
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
      minify: {
        removeComments: true,
      },
    }),
  ],
};
