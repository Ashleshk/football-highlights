var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: ['bootstrap-loader/extractStyles', './src/js/app.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            { test: /\.css$/, use: ExtractTextPlugin.extract({
                fallback: 'style-loader', use: 'css-loader',
            }) },
            { test: /\.scss$/, use: ExtractTextPlugin.extract({
                fallback: 'style-loader', use: 'css-loader!sass-loader',
            }) },
            { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000' },
            { test: /\.(ttf|eot)(\?[\s\S]+)?$/, loader: 'file-loader' },
            { test: /\.(svg|jpg|png|gif)$/, loader: 'url-loader?limit=3000&name=[name].[ext]' },
            { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports-loader?jQuery=jquery' },
            { test: /\.html$/, loader: 'html-loader' },
            {
                test: /\.js$/, loader: 'babel-loader', query: {
                presets: ["babel-preset-es2015"].map(require.resolve)
            } }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].bundle.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Util: "exports-loader?Util!bootstrap/js/dist/util"
        })
    ]
}
