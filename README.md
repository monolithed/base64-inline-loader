# base64-inline-loader

> Base64 loader for Webpack

This loader supports the most popular file extensions and can be injected directly into a file.


### Installation

**npm**

```
npm install base64-inline-loader --save
```

or

**package.json**

```js
"devDependencies": {
	"base64-inline-loader": "^0.x"
}
```

### Usage

#### Config

```js
let path = require('path');

let Webpack = require('webpack');
const DIR_NAME = path.join(__dirname, '..');

module.exports = {
	entry: [
		'./index.jsx'
	],

	output: {
		path      : `${DIR_NAME}/cache`,
		filename  : 'build.js',
		publicPath: '/'
	},

	resolve: {
		extensions: ['', '.js', '.jsx', '.json', '.css'],
	},

	target : 'web',

	module: {
		loaders: [
			{
				test   : /\.css$/,
				loaders: ['style', 'css' ]
			},

			{
				test   : /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader: 'base64-inline-loader'
			}
		]
	}
};
```

For more information about webpack loaders see official [documentation](http://webpack.github.io/docs/using-loaders.html). 


#### Input

```css
@font-face {
	font-family: 'icons';
	src: url('./icon.woff');
}

body {
	background-image: url('./image.png');
}
```

#### Output

```css
@font-face {
	font-family: 'icons';
	src: url('data:application/x-font-woff;charset=utf-8;base64,[BASE_64_STRING...]')
}

body {
	background-image: url('data:application/png;charset=utf-8;base64,[BASE_64_STRING...]');
}
```
