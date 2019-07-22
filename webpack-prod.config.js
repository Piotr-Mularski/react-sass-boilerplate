const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const VENDOR_LIBS = ['react', 'react-dom'];

module.exports = {
	resolve: {
		alias: {
			img: path.join(__dirname, 'src/img')
		}
	},
	entry: {
		bundle: ['babel-polyfill', './src/app.js'],
		vendor: VENDOR_LIBS
	},
	output: {
		path: path.join(__dirname, '/docs'),
		publicPath: '/',
		filename: '[name].[chunkhash].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(css|scss)$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader?minimize=true!postcss-loader!sass-loader'
				})
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
				exclude: /node_modules/,
				loader: 'url-loader',
				query: {
					limit: 1,
					name: './assets/images/[name].[ext]'
				}
			}
		]
	},
	devtool: 'source-maps',
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		new CleanWebpackPlugin(['docs']),
		new UglifyJsPlugin(),
		new HtmlWebpackPlugin({ template: path.join(__dirname, '/src/index.html') }),
		new ExtractTextPlugin('[name].css')
		// new CopyWebpackPlugin([{ from: path.join(__dirname, '/src/img'), to: 'assets/images' }])
	]
};
