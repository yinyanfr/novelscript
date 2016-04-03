/**
 * Created by Ian on 2016/4/3.
 */

var fs = require("fs");
var argv = require("argv");
var minify = require("minify");

function getList(data, path){
    var exception = [/jquery-/, /control\.js/, /page\.js/];
    var except = function (script, exception) {
        for(var i = 0; i < exception.length; i++){
            if(script.match(exception[i])) return true;
        }
        return false
    };
    var addPath = function (script, path) {
        return path + script
    };
    var list = [];
    var scriptRegex = /<script +src *= *(\"[^\"]+\.js\"|\'[^\']+\.js\")[^>]*> *<\/script>/;
    var replaceHead = /^<script +src *= *(\"|\')/;
    var replaceFoot = /(\"|\')[^>]*> *<\/script>$/;
    for(var i = 0; i < data.length; i++){
        var scriptMatch = data[i].match(scriptRegex);
        var script = scriptMatch && scriptMatch[0];
        if(script && !except(script, exception)){
            list.push(addPath(script.replace(replaceHead, "").replace(replaceFoot, ""), path))
        }
    }
    return list
}

function combine(list, str){
    fs.readFile(list.shift(), "utf-8", function (err, data) {
        if(err) throw err;
        if(list.length == 0){
            fs.writeFile("res.js", str + data, function (err) {
                if(err) throw err;
                minify('res.js', function(error, data) {
                    if (error)
                        console.error(error.message);
                    else
                        fs.writeFile("res.min.js", data, function (err) {
                            if(err) throw err
                        })
                });
            })
        }
        else combine(list, str + data + "\n")
    })
}

fs.readFile(argv.run().targets[0] || "example.html", "utf-8", function (err, data) {
    if (err) throw err;
    data = data.toString().split("\n");
    while (data[data.length - 1] == "") {
        data.length--
    }
    var list = getList(data, '../');
    console.log(list)
    combine(list, "");
});


