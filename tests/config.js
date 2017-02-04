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
			rules: [
				{
					test: /\.(png|css|woff)$/,
					use: path.join(__dirname, '../index.js')
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
