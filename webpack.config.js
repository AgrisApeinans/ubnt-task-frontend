const path = require('path')
const webpack = require('webpack')
const HmtlWebpackPlugin = require('html-webpack-plugin')

const SRC_DIR = path.resolve(__dirname, 'src')
const DIST_DIR = path.resolve(__dirname, 'dist')
const ROOT_DIR = path.resolve(__dirname)

module.exports = {
    entry: {
        app: `${SRC_DIR}/index.js`,
        vendor: ['react'],
    },
    output: {
        filename: '[name].js',
        path: DIST_DIR,
        publicPath: '/',
    },
    resolve: {
        alias: {
            src: SRC_DIR,
            root: ROOT_DIR,
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss/,
                include: /src/,
                loader: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff',
            },
        ],
    },
    plugins: [
        new HmtlWebpackPlugin({
            title: 'Ubnt chat',
            template: require('html-webpack-template'),
            inject: false,
            mobile: true,
            minify: {
                collapseWhitespace: true,
            },
            links: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,500',
                },
            ],
        }),
        new webpack.ProvidePlugin({
            React: ['react'],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
            environment: JSON.stringify('development'),
            basename: JSON.stringify('/'),
        }),
    ],
    mode: 'development',
    devServer: {
        hot: true,
        port: 3001,
        compress: true,
        stats: 'minimal',
        contentBase: SRC_DIR,
        historyApiFallback: true,
    },
}
