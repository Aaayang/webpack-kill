const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        // 生成静态文件根目录
        contentBase: './dist',
        port: 8080,
        host: 'localhost'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader",
                    options: {
                        // 插入头部
                        insertAt: 'top'
                    }
                }, "css-loader"],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.(gif|jpg|jpeg|png|bmp|eot|woff|woff2|ttf|svg)$/,
                use: [
                    {
                        // url-loader 里面封装了 file-loader
                        loader: 'url-loader',
                        options: {
                            limit: 2, // 2 * 1024 => 2kb
                        }
                    }
                ]
            }
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
        })
    ]
};