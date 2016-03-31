
var webpack = require('webpack');

module.exports = [{
	
	entry: './Prototype/Scripts/app',

	output: {
		path: __dirname + '/Prototype/Public',
		filename: '[name].js',
		library: '[name]'
	},

	devtool: 'source-map',

	module: {
    loaders: [
      { test: /\.hbs/, loader: "handlebars-loader" }
    ]
  } 


}, 

{
  
	entry: './ECMAScript 6/Scripts/app',

	output: {
		path: __dirname + '/ECMAScript 6/Public',
		filename: '[name].js',
		library: '[name]'
	},

  devtool: 'source-map',

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates:    ['*-loader', '*'],
    extensions:         ['', '.js']
  },

  module:	{
  	loaders: [
  		{ test: /\.hbs/, loader: "handlebars-loader"},
  		{ test: /\.js/, loader: "babel-loader", 
  		query: {
          presets: ['es2015']
        }}
  	]
  }
}]