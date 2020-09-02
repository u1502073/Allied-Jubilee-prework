const HtmlWebPackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const HtmlWebpackPluginConfig = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
});
const context = path.resolve(__dirname, './src')

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://0.0.0.0:3030`,
      'webpack/hot/only-dev-server',
      './src/index',
    ]
  },
  output: {    
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
   rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'eslint-loader'
      },
      {
        test: /\.html?$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      },
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                'react-css-modules',
                {
                  context,
                  generateScopedName: '[name]__[local]___[hash:base64:5]',
                  webpackHotModuleReloading: false,
                  filetypes: { '.scss': { syntax: 'postcss-scss' } },
                },
              ],
            ],
          },
        }
      },
      {
        test: /\.(?:scss|css)$/i,
        exclude: [
          path.join(context, 'sass/index.scss'),
          path.join(context, 'css/bootstrap-v4.1.1.css'),
          path.join(context, 'css/bootstrap-v4.0.0-landing.css')
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              modules: true,
            }
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true },
              optipng: { optimizationLevel: 7 },
              gifsicle: { interlaced: false },
              pngquant: { quality: '65-90', speed: 4 },
            },
          },
        ],
      },
    ]
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 3030,
    open: true
  },
  plugins: [
    HtmlWebpackPluginConfig
  ]
};
