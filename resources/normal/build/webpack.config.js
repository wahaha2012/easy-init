const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const resolve = (filePath) => {
  return path.resolve(__dirname, "../", filePath);
};

module.exports = {
  mode: "development",
  entry: {
    index: resolve("src/index.js"),
  },
  output: {
    path: resolve("dist"),
    filename: "[name].[chunkhash:8].js",
    clean: true,
    publicPath: "/",
  },

  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader", "webpack-module-hot-accept"],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },

  // devtool: "inline-source-map",

  devServer: {
    static: "./dist",
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Hello Word",
      template: resolve("public/index.html"),
    }),
  ],
};
