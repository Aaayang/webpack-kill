const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 多文件，多入口
module.exports = {
    entry: {
        pageA: './src/pageA',
        pageB: './src/pageB'
    },
    output: {
        path: path.resolve('dist'),
        // name 就是入口的 key，例如 pageA
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'pageA.html',
            chunks: ['pageA']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'pageB.html',
            chunks: ['pageB']
        }),
    ]
};