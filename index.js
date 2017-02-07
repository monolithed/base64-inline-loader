'use strict';

let loaderUtils = require('loader-utils');
let fileLoader = require('file-loader');
let mimeType = require('mime-types');

module.exports = function (content) {
	if (this.cacheable) {
		this.cacheable();
	}

	let query = loaderUtils.parseQuery(this.query);

	let extension = loaderUtils.interpolateName(this, '[ext]', {
		context: query.context || this.options.context,
		content: content,
		regExp: query.regExp
	});

	extension = extension.toLowerCase();

	let type = mimeType.lookup(extension),
		data = content.toString('base64');

	if (!type) {
		throw new Error(`${extension} type is not supported`);
	}

	let { limit = 0 } = query;

	try {
		({ dataUrlLimit: limit } = this.options.url);
	}
	catch (error) { }

	if (limit <= 0 || content.length < limit) {
		let url = JSON.stringify(`data:${type};charset=utf-8;base64,${data}`);

		return `module.exports = ${url}`;
	}

	return fileLoader.call(this, content);
}

module.exports.raw = true;
