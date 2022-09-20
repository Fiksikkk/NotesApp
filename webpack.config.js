const path = require('path')


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    devServer: {
        static: [
            {
                directory: __dirname + '/src',
                publicPath: '/',
            },
        ],
        compress: true,
        port: 8080,
        liveReload: true,
        watchFiles: 'src/*',
        open: true,

        },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
};