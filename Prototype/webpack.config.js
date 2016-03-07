module.exports = {
	entry: './Scripts/app.js',

	output: {
		path: './Scripts/',
		filename: 'compiled.js'
	},

	devtool: 'source-map',

	module: {
    loaders: [
      { test: /\.hbs/, loader: "handlebars-loader" }
    ]
  },
}