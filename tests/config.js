'use strict';

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
	{
		entry: './tests/fixtures/index.css',

		output: {
			path: './tests/cache',
			filename: 'index.css'
		},

		plugins: [
			new ExtractTextPlugin('index.css')
		],

		module: {
			rules: [
				{
					test: /\.(png|css|woff)$/,
					loader: path.join(__dirname, '../index.js'),
					query: {
						limit: 1000,
						name: '[name].[ext]'
					}
				},

				{
					test: /\.css$/,

					use: ExtractTextPlugin.extract({
						fallbackLoader: 'style-loader',
						loader: 'css-loader'
					})
				}
			]
		}
	}
];
