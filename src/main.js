// both "$" and "jQuery" reference to jquery
$ = jQuery = require("jquery");

// This wont be a global code, but its own module because of commonjs we use
var App = console.log("Hello world from Browserify");

module.exports = App;