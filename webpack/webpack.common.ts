import { resolve, join } from "path";
import { Configuration, DefinePlugin } from "webpack";
import * as HtmlWebPackPlugin from "html-webpack-plugin";
import * as MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import * as CopyPlugin from 'copy-webpack-plugin';
import * as dotenv from 'dotenv';

dotenv.config();

const isDevelop = process.env.ENVIRONMENT;

export const common: Configuration = {
  entry: "./src/index.tsx",
  devtool: false,
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { test: /\.css$/, loader: "css-loader" },
      {
        test: /\.(s*)css$/,
        use: [
            isDevelop ? 'style-loader' : MiniCSSExtractPlugin.loader, // Style nodes from JS strings.
            "css-loader", // Translate CSS into CommonJS
            'resolve-url-loader',
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
        ]
    },
    {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }
        ]
    },
    {
        test: /\.png$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/'
                }
            }
        ]
    },
    ]
  },
  output: {
    path: resolve(__dirname, "../build"),
    filename: "[name].[chunkhash].bundle.js",
    chunkFilename: "[name].[chunkhash].bundle.js",
    publicPath: '/'
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".scss"],
    alias: {
        utils: resolve(__dirname, '../src/utils'),
        hooks: resolve(__dirname, '../src/hooks'),
        types: resolve(__dirname, '../src/types'),
    },
  },
  plugins: [
    new DefinePlugin({
        CONFIG: {
            ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
            API_URL: JSON.stringify(process.env.API_URL),
            PRODUCTS_LIST_LIMIT: JSON.stringify(process.env.PRODUCTS_LIST_LIMIT),
            META_KEYWORDS: JSON.stringify(process.env.META_KEYWORDS),
        },
    }),
    new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "index.html"
    }),
    new MiniCSSExtractPlugin({
      filename: "[name].[chunkhash].css",
    }),
    new CopyPlugin({
        patterns: [
            {
                from: join(__dirname, '../src/assets/favicon.ico'),
                to: join(__dirname, '../build'),
            }
        ]
    }),
  ]
};