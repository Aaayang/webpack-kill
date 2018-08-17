const path = require('path');
const HappyPack = require('happypack');


// 多入口
/* let entry = {
    key1: 'value1',
    key2: 'value2'
};

let htmlPlugins = [];

for(let key in entry) {
    htmlPlugins.push(new HtmlWebpackPlugin({
        template: 'index.html',
        filename: `${key}.html`
    }));
} */

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{
                    loader: 'happypack/loader?id=babel'
                }]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'happypack/loader?id=css'
                }]
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'stage-0', 'react'],
                    plugins: ['transform-decorators-legacy']
                }
            }]
        }),
        new HappyPack({
            id: 'css',
            use: ['style-loader', 'css-loader'],
            // threads: 2, // 代表开启几个子进程去处理
            // verbose: true // 是否允许输出日志
        })
    ]
};