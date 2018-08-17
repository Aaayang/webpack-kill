const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name]_dll.js',
        libraryTarget: 'var',
        library: '_dll_[name]' // var _dll_react = xxx
    },
    plugins: [
        new DllPlugin({
            // 这里的name要和上面一样
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', '[name].manifest.json')
        })
    ]
};