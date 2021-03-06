/* Webpack client config file */
let webpack = require( 'webpack' );
let ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
let path = require( 'path' );
var nodeExternals = require( 'webpack-node-externals' );

const env = process.env.NODE_ENV;

module.exports = [ {
    entry: [
        './src/client.js'
    ],
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve( './dist/public' )
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.css/,
                include: /node_modules/,
                use: ( env === 'production' )
                    ? ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader'
                            },
                            'postcss-loader'
                        ]
                    })
                    : [
                        {
                            loader: 'css-loader'
                        }
                    ]
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ( env === 'production' )
                    ? ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    sourceMap: true,
                                    importLoaders: 1,
                                    localIdentName: 'css-[hash:base64:5]',
                                }
                            },
                            'postcss-loader'
                        ]
                    })
                    : [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        'postcss-loader'
                    ]
            }, {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|ico|xml|json)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/',
                    publicPath: '/'
                }
            }
        ]
    },
    devServer: {
        contentBase: './dist/public'
    },
    resolve: {
        modules: [ 'node_modules' ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true
            },
            output: {
                comments: false,
            },
            exclude: [ /\.min\.js$/gi ]
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.BROWSER': JSON.stringify( process.env.BROWSER ),
            'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
        })
    ]
} ];
