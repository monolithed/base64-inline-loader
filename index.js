'use strict';

let loaderUtils = require('loader-utils');
let fileLoader = require('file-loader');
let mimeType = require('mime-types');

module.exports = function (content) {
	if (this.cacheable) {
		this.cacheable();
	}

	let { explicitMimeType, limit = 0 } = this.query,
		type;

	if (explicitMimeType) {
		type = explicitMimeType;
	} else {
		let extension = loaderUtils.interpolateName(this, '[ext]', {
			context: this.query.context || this.rootContext,
			content: content,
			regExp: this.query.regExp
		});

		extension = extension.toLowerCase();

		type = mimeType.lookup(extension);

		if (!type) {
			throw new Error(`${extension} type is not supported`);
		}
	}

	let data = content.toString('base64');

	try {
		({ dataUrlLimit: limit } = this.query.url);
	}
	catch (error) { }

	if (limit <= 0 || content.length < limit) {
		let url = JSON.stringify(`data:${type};charset=utf-8;base64,${data}`);

		return `module.exports = ${url}`;
	}

	return fileLoader.call(this, content);
};

module.exports.raw = true;
