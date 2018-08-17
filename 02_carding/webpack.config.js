const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const mock = require('./mock');

const bootstrapPath = path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css');

module.exports = {
    entry: './src/index.js',
    // entry: {
    //     main: './src/index.js'
    // },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css'],
        alias: {
            // bootstrap: bootstrapPath
        },
        // 先找模块中的 index.js 再找 root
        mainFiles: ['index', 'root'],
        // 现在 package.json 中的 style，再找 main，那上面 bootstrap alias 就不用配了
        mainFields: ['style', 'main'],
        modules: [
            // 不要东奔西走了，都去 node_modules 下找
            path.resolve('node_modules'),
            // 找不到来这也看一下，再找不到就算啦
            // path.resolve('src/loaders')
        ],
        // 寻找 loader 的配置
        // resolveLoader: {
        //     modules: [
        //         path.resolve('node_modules'),
        //         path.resolve('src/loaders')
        //     ]
        // }
    },
    devServer: {
        // 生成静态文件根目录
        contentBase: './dist',
        port: 8080,
        host: 'localhost',
        /* proxy: {
            // 如果请求的是 /api/users 把 /api 去掉
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: {
                    "^/api": ""
                }
            }
        } */
        before(app) {
            mock(app);
        }
    },
    // 开启才会监听
    watch: false,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
        aggregateTimeout: 500
    },
    devtool: 'source-map', // 在同一文件中生成，可以映射到列
    externals: {
        // 这个模块是外部提供的，不需要打包，jQuery 来自 window.jQuery
        jquery: 'jQuery'
    },
    module: {
        // 如果说这个模块不需要解析就可以
        noParse: /jquery|lodash/,
        rules: [
            {
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        // 编译 es6, es7, react
                        presets: ['env', 'stage-0', 'react']
                    }
                }],
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/ // 排除，优化，node_modules 是编译过的
            },
            {
                test: /\.css$/,
                use: [{
                    // 负责收集所有的 CSS 文件
                    loader: MiniCssExtractPlugin.loader,
                }, "css-loader", "postcss-loader"],
                // exclude: /node_modules/,
                // include: path.resolve(__dirname, 'src')
            },
            // scss
            {
                test: /\.scss$/,
                use: [{
                    // 负责收集所有的 css 文件
                    loader: MiniCssExtractPlugin.loader
                }, 'css-loader', 'sass-loader'],
                // exclude: /node_modules/,
                // include: path.resolve(__dirname, 'src')
            },
            // less
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, 'css-loader', 'less-loader'],
                // exclude: /node_modules/,
                // include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.(gif|jpg|jpeg|png|bmp|eot|woff|woff2|ttf|svg)$/,
                use: [
                    {
                        // url-loader 里面封装了 file-loader
                        loader: 'url-loader',
                        options: {
                            limit: 2, // 2 * 1024 => 2kb
                            // 相对dist保存目录
                            outputPath: 'images', // 输出路径
                            publicPath: '/images'
                        }
                    }
                ]
            },
            // in html use img
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 引入的模板
            template: './src/index.html',
            // 生成的文件
            filename: 'index.html',
            // 删除属性的双引号
            minify: {
                removeAttributeQuotes: true
            },
            // 给文件加 Hash
            hash: true
        }),
        new MiniCssExtractPlugin({
            // entry 的名字 main
            filename: 'css/[name].css'
        }),
        new webpack.ProvidePlugin({
            "_": 'lodash'
        }),
        new webpack.BannerPlugin('weixian'),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/assets'),
            to: path.resolve(__dirname, 'dist/assets')
        }]),
        new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
        // 定义一些可以在模块中使用的全局变量
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false), // 是否生成环境
            VERSION: "1+1",
            INFO: {
                NAME: JSON.stringify("XXX")
            }
        }),
        // moment 有一堆语言包，非常大
        new webpack.IgnorePlugin(/^\.\/locale/,/moment$/)
    ]
};