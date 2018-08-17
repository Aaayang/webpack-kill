const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        libraryTarget: 'var', // 默认
        // libraryTarget: 'commonjs',
        // libraryTarget: 'commonjs2',
        // libraryTarget: 'this',
        // libraryTarget: 'window',
        // libraryTarget: 'global',
        library: 'weixian'
    },
};