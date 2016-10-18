'use strict';

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
	{
		entry: './tests/fixtures/index.css',

		output: {
			path: './tests/assets',
			filename: 'index.css'
		},

		plugins: [
			new ExtractTextPlugin('index.css')
		],

		module: {
			loaders: [
				{
					test   : /\.(png|css|woff)$/,
					loader: path.join(__dirname, '../index.js')
				},

				{
					test   : /\.css$/,
					loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
				}
			]
		}
	}
];
