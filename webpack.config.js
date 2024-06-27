const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/settings/index.tsx",
  output: {
    filename: "settings/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
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
    extensions: [".js", ".jsx", ".ts", ".tsx"],
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
