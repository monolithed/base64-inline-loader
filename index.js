'use strict';

let loaderUtils = require('loader-utils');
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
	})
	.toLowerCase();

	let type = mimeType.lookup(extension),
		data = content.toString('base64');

	if (!type) {
		throw new Error(`${extension} type is not supported`);
	}

	let url = `data:${type};charset=utf-8;base64,${data}`;

	return `module.exports = ${JSON.stringify(url)}`;
}

module.exports.raw = true;
