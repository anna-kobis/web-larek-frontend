const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV;
const specificEnvPath = env ? path.join(process.cwd(), `.env.${env}`) : null;
const defaultEnvPath = path.join(process.cwd(), '.env');

const targetPath =
  specificEnvPath && fs.existsSync(specificEnvPath)
    ? specificEnvPath
    : defaultEnvPath;

require('dotenv').config({ path: targetPath });

const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: './src/index.ts',
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8080,
    watchFiles: ['src/pages/*.html'],
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/pages/index.html',
    }),

    new MiniCssExtractPlugin(),

    new DefinePlugin({
      'process.env.DEVELOPMENT': !isProduction,
      'process.env.API_ORIGIN': JSON.stringify(process.env.API_ORIGIN ?? ''),
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public'),
          to: path.resolve(__dirname, 'dist/public'),
          globOptions: {
            ignore: [
              '**/.nojekyll',
              '**/browserconfig.xml',
              '**/manifest.json',
            ],
          },
        },
        {
          from: path.resolve(__dirname, 'src/public/.nojekyll'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'src/public/browserconfig.xml'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'src/public/manifest.json'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: ['babel-loader', 'ts-loader'],
        exclude: ['/node_modules/'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          stylesHandler,
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              api: 'modern',
              sourceMap: true,
              sassOptions: {
                includePaths: ['src/scss'],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2|svg|png|jpg|jpeg|ico|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[hash][ext]',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }

  return config;
};
