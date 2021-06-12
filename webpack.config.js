const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    target: 'web',
    entry: path.join(__dirname, "src", "index.js"),
    output: { publicPath: "/", path: path.join(__dirname, "build"), filename: '[name].[contenthash].js', clean: true },
    mode: process.env.NODE_ENV || "development",
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: ['.js', '.jsx'],
        fallback: { "crypto": false }
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        port: 3000,
        historyApiFallback: true,
        hot: true,
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|(woff(2)?|ttf|eot))$/,
                use: ["file-loader"]
            },
            {
                test: /\.wasm$/,
                type: 'javascript/auto',
                loader: 'file-loader',
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "public", to: "", globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: ["**/*.html"],
                    }
                }
            ],
        }),
    ],
};