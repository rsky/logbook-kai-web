const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const config = {
    entry: "./src/index",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: [ "/node_modules/", "/src/@types/", "/src/listeners/_Skeleton.ts" ],
            loader: "babel-loader",
        }],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Logbook",
            template: "./assets/index.html",
        }),
    ],
}

module.exports = (env, argv) => {
    const production = argv.mode === 'production'

    config.plugins.push(
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(production),
            DEFAULT_HOST: JSON.stringify("127.0.0.1:10080"),
        }),
    )

    if (production) {
        config.devtool = 'source-map'
    } else {
        config.devtool = 'inline-source-map'
    }

    return config
}
