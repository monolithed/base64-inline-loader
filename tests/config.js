'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
	{
		entry: './tests/fixtures/index.css',

		output: {
			path: path.join(__dirname, 'cache'),
			filename: 'index.css'
		},

		plugins: [
			new ExtractTextPlugin('index.css')
		],

		module: {
			rules: [
				{
					test: /\.(png|css|woff)$/,
					use: {
						loader: path.join(__dirname, '../index.js'),
						query: {
							limit: 1000,
							name: '[name].[ext]'
						}
					}
				},
				{
					test: /\.jpg$/, // the sample file has actually just the jpg extension, the content is identical to the png
					use: {
						loader: path.join(__dirname, '../index.js'),
						query: {
							limit: 1000,
							name: '[name].[ext]',
							explicitMimeType: "image/png"
						}
					}
				},
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					})
				}
			]
		}
	}
];
