const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    entry: './main.tsx',
    context: resolve(__dirname, 'src'),
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        client: {
            overlay: {
                runtimeErrors: false
            }
        }
    },
    output: {
        path: resolve(__dirname, 'build'),
        clean: true,
        filename: "[name].[contenthash].js"
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: 'index.html'}),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: resolve(__dirname, 'tsconfig.json')
            }
        })
    ]

}