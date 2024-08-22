const { merge } = require("webpack-merge");
const config = require('./webpack.config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(config, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
                exclude: /\.module\.css$/,
            },
            {
                test: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: true,
                            modules: {
                                localIdentName: "[name]__[local]__[hash:base64:5]",
                            }
                        }
                    },
                    'postcss-loader'
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ]
})
