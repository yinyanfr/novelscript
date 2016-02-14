/**
 * Created by yan on 16/2/14.
 */

// this is a node.js file
var fs = require("fs");
fs.readFile("./test.txt", "utf-8", function (err, data) {
    if(err) throw err;
    data = data.toString().split("\n");
    while(data[data.length-1] == ""){
        data.length--
    }
    console.log(data)
});