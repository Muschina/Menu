var webpack = require("webpack"),
    path = require("path");
    webpack.config = require("./webpack.config.js");

// Karma configuration
// Generated on Mon May 11 2015 14:13:57 GMT-0600 (MDT)

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [        
        "Test/*.test.js"        
    ],
    preprocessors: {
        "./Test/*.test.js": ["webpack"]
    },
    webpack: {
        module: {
            loaders: [
              { test: /\.hbs/, loader: "handlebars-loader" }
            ]
        },
        plugins: [
            new webpack.ResolverPlugin([
                new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
            ])
        ]
    },
    webpackMiddleware: {
        noInfo: true
    },
    plugins: [
        require("karma-webpack"),
        require("karma-jasmine"),
        require("karma-chrome-launcher")
    ],
    reporters: ["dots"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false
  });
};