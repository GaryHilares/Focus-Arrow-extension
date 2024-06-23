const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/settings/index.js",
  output: {
    filename: "settings/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/react-template.html",
      filename: "settings/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/background/",
          to: "background/",
        },
        {
          from: "src/popup/",
          to: "popup/",
        },
        {
          from: "public/",
          globOptions: {
            ignore: ["**/react-template.html"],
          },
        },
      ],
    }),
  ],
  devtool: "inline-source-map",
};
