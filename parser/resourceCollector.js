/**
 * Created by yan on 16/3/9.
 */

// resource collector version node

var fs = require("fs");
var argv = require("argv");

var input = argv.run().target[0];
if(!input) throw "No input source detected !";
var output = argv.run.target[1] || "resource.json";

var collector = function (data) {

};

fs.readFile(input, function (err) {
    if(err) throw err;
    fs.writeFile(output, collector(JSON.parse(input)), function (err) {
        if(err) throw err;
    })
});