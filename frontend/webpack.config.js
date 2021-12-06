const path = require('path')
const  HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    //配置环境
    mode: 'development',

    devtool: 'source-map',
    
    //配置入口文件
    entry: {
        'js/app': './src/app.js'
    },
    //配置出口文件，需要绝对路径
    output: {
        path: path.join(__dirname,'/dist'),
        filename: '[name].js'
    },
    //有问题module？版本问题
    module:{
            rules:[
                {
                    test: /\.art$/,
                    use: {
                      loader: 'art-template-loader',
                      options:{
                          escape: false
                      }
                    }
                },
                {//css-loader解析css代码，style-loader将css代码处理到html上
                    test:/\.css$/,
                    loaders:["style-loader", "css-loader"]  
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                    {
                        loader: 'url-loader',
                        options: {
                        limit: 8192,
                        },
                    },
                    ],
                }

            ]
                 },
    //配置插件
    plugins: [
        //该插件将为你生成一个 HTML5 文件，默认indext.html 
        //使用 script 标签引入你所有 webpack 生成的 bundle。
        new HtmlWebpackPlugin({
            //指定入口html是path.join(__dirname,'./public/index.html')
            template:path.join(__dirname,'./public/index.html'),
            filename:'index.html',
            inject: true
        }),

        new CopyPlugin({
            patterns: [
                   {  
                    from: './public/*.ico',
                    to: path.join(__dirname, './dist/favicon.ico'),
                    },
                    {
                     from: './public/libs',
                     to: path.join(__dirname,'./dist/libs/')

                    }
              ],
        }),
        //把dist文件打包前删掉
        new CleanWebpackPlugin()

    ],    
    //配置server
    devServer:{
        host: '192.168.2.237',
        contentBase: path.join(__dirname, './dist'),
        port: 8080,
        proxy: {//跨域代理
            "/api": {
              target: "http://localhost:3000",
            }
          }

    }
}