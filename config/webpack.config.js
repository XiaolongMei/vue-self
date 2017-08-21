let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let BUILD_PATH = path.join(__dirname, "./dist");  //输出目录
let webpack = require('webpack');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let WebpackDevServer = require('webpack-dev-server');
let ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: {
        index: "./src/js/index.js",
        vendor: ["vue",'vuex','vue-router','axios']
    },
    output: {
        path: BUILD_PATH,
        publicPath: '/',
        filename: "js/[name].min.js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'components': path.join(__dirname, "./src/components"),
            'pages': path.join(__dirname, "./src/pages"),
            'util': path.join(__dirname, "./src/util")
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','less-loader'] }),
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|eot|ttf)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    name: "./assets/[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: path.join(BUILD_PATH, "index.html"),
            template: './src/index.html',
            chunks: ["vendor", "index"],
            inject: true,
            hash: true,
            minify: { //压缩HTML文件
                removeComments: true,    //移除HTML中的注释
                collapseWhitespace: true    //删除空白符与换行符
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name].min.js'
        }),
        new ExtractTextPlugin('css/[name].bundle.css')

    ],

    devServer: {
        contentBase: "/",
        port: '9001',
        proxy: {
            '*': {
                target: 'https://zeji.tempus.cn/zeji-front/test',
                secure: false
            }
        }
    }


};