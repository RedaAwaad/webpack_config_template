const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        index: ['./src/js/index.js', './src/css/main.css',  './src/css/style.scss']
    },
    output: {
        filename: 'js/bundle.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
     // To Prevent minimize js files set to false
    // optimization: {
    //     minimize: false
    // },
    module: {
        rules: [
            { // Babel Transpiler for ES6 Syntax && New Features
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.((c|sa|sc)ss)$/i, //css, sass, scss files
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Extract Css Files In One Bundle ?? this shoud always be above CSS-LOADER
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                    // It calls autoprefixer
                    'postcss-loader'
                ],
            },
        ]
    },
    plugins: [
        // Config For External Css File
        new MiniCssExtractPlugin({
            filename: './css/bundle.min.css'
        }),
        new CleanWebpackPlugin(), // To Clean The Output Folder In Every Build
        new HtmlWebpackPlugin({
            filename: 'dashboard.html',
            template: './src/admin.html',
            scriptLoading: 'defer',
            minify: false
        }), // To Move The HTML File into The Output File And Link the Main js File 
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            scriptLoading: 'defer',
            minify: false
        }),
        // Configration for postcss
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer()]
            }
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 5000,
        open: true
    }


}