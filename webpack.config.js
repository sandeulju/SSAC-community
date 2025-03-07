const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require("dotenv-webpack");


const JS_PATH = './src/js'
const TEMPLATE_PATH = './src/views'

module.exports = (env, argv) => {
    // devServer
    // devtool: 'eval-cheap-source-map', 
    return {
        mode: "development",
        devServer: {
            // contentBase:'./dist', // 서버 시작 시 static 파일 경로 지정
            port: 8891,
            hot: true
        },

        // webpack config
        entry: {
            main: `${JS_PATH}/index.js`,
            component: [`${JS_PATH}/Components/app.js`, `${JS_PATH}/Components/bpp.js`]
        },
        output: {
            filename: '[name].[chunkhash].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.json', '.jsx', '.css'],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', {
                                    targets: {
                                        node: 'current', // 노드일 경우만
                                        //browsers: ["last 3 versions", "ie >= 11"] // 각 브라우저로도 가능
                                    },
                                    modules: false, //<== 이거 에러나는데 왜 아는거지?? 
                                    // useBuiltIns: 'usage' <== 이거 경고 나옴...
                                }
                            ],
                            // '@babel/preset-react', // 리액트를 사용한다면
                            // '@babel/preset-typescript' // 타입스크립트를 사용한다면
                        ],
                        plugins: ['@babel/plugin-syntax-dynamic-import', "@babel/plugin-transform-runtime"]
                    },
                    include: [path.resolve(__dirname, JS_PATH)],
                    exclude: ['/node_modules'],
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            }
                        }],
                    exclude: ['/node_modules'],
                }
            ]
        },
        plugins: [
            new Dotenv(),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({ filename: '[name].css' }),
            new HtmlWebpackPlugin({
                template: `${TEMPLATE_PATH}/login.html`,
            }),
            new HtmlWebpackPlugin({  // Also generate a test.html
                filename: 'loginsan/loginsan.html',
                template: `${TEMPLATE_PATH}/loginsan/loginsan.html`,
            }),
            new HtmlWebpackPlugin({  // Also generate a test.html
                filename: 'loginsan/santest.html',
                template: `${TEMPLATE_PATH}/loginsan/santest.html`,
                template: `${TEMPLATE_PATH}/home.html`,
            }),
            new HtmlWebpackPlugin({  // Also generate a test.html
                filename: 'mypage/mypage.html',
                template: `${TEMPLATE_PATH}/mypage/mypage.html`,
            }),
            new HtmlWebpackPlugin({  // Also generate a test.html
                filename: 'mypage/changemypage.html',
                template: `${TEMPLATE_PATH}/mypage/changemypage.html`,
            }),
            new HtmlWebpackPlugin({
                filename: 'join/join.html',
                template: `${TEMPLATE_PATH}/join/join.html`,
            }),
            new HtmlWebpackPlugin({  // Also generate a test.html
                filename: 'join/join_succeed.html',
                template: `${TEMPLATE_PATH}/join/join_succeed.html`,
            }),
            new HtmlWebpackPlugin({
                filename: 'found/found.html',
                template: `${TEMPLATE_PATH}/found/found.html`,
            })
            // new BundleAnalyzerPlugin()
        ],
        optimization: {
            runtimeChunk: 'single' // chunk 변경시 매번 새로고침하기 불편해서 적용
        }
    }

}