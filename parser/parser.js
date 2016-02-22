/**
 * Created by yan on 16/2/14.
 */

// this is a node.js file
var fs = require("fs");

ns.parser = function (data) {
    var range = function (start, end ,step){
        var finish = end;
        start = start || 0;
        step = step || 1;
        if(!end){
            finish = start;
            start = 0
        }
        return function (f){
            for(start; start < finish; start += step){
                f(start)
            }
        }
    };
    var parser = {};
    var result = {};
    var progress = {};
    /**
     * replace substrings in string
     * @param str: String
     * @param remove: String, substring to be removed
     * @param placed: String, substring to be placed
     * @returns string
     */
    var stringReplace = function (str, remove, placed) {
        var re = new RegExp(remove + "+", "g");
        return str.replace(re, placed)
    };
    var stripSpace = function (str) {
        return stringReplace(str, " ", "")
    };
    parser.splitScript = function () {
        var scriptRegex = /^\[script/;
        var scriptOpen = false;
        for(var i = 0; i < data.length; i++){
            if(scriptRegex.test(data[i])){
                stripSpace(data[i]);
                var tmp = data[i].match(/:[A-Za-z0-9 _]+/)[0];
                tmp = stringReplace(tmp, ":", "");
                result[tmp] = [];
                scriptOpen = tmp;
            }else {
                if(scriptOpen){
                    result[scriptOpen].push(data[i])
                }
            }
        }
    };
    parser.parseDialogue = function (dial) {
        var res = {};
        // special
        // parse merge
        var mergeRegex = /^\[merge\]/;
        var mergeBodyRegex = /\[.+]\]/;
        if(dial.match(mergeRegex)){
            res.merge = true;
            dial.replace(mergeRegex, "");
            var mergeMatch = dial.match(mergeBodyRegex);
            var mergeBody = (mergeMatch) && (mergeMatch[0]);
            try{
                mergeBody = JSON.parse(mergeBody)
            }catch (err){
                console.log(err)
            }
            if(Array.isArray(mergeBody)){
                res.mergeBody = mergeBody
            }
            return res
        }
        // normal
        // parse speaker
        var speakerRegex = /^\[[\u4e00-\u9fa5A-Za-z0-9 _]+\]/; // verified
        var speakerMatch = dial.match(speakerRegex);
        res.speaker = (speakerMatch) && (dial.match(speakerRegex)[0]) || null;
        dial.replace(speakerRegex, ""); // parse speaker done
        // parse figure
        var figureRegex = /\[([A-Za-z0-9_-]+\.png|([A-Za-z0-9_-]+\.png)*(, ?[A-Za-z0-9_-]+\.png)+)\]/; // verified
        var figureMatch = dial.match(figureRegex);
        var figure = (figureMatch) && figureMatch[0];
        if(figure){
            figure = figure.replace(/\[ */, "[\"")
                .replace(/ *, */g, "\", \"")
                .replace(/ *\]/, "\"]");
            console.log(JSON.parse(figure));
            /*
            try{
                figure = JSON.parse(figure)
            }catch (err){
                console.log(err)
            }
            if(Array.isArray(figure)){
                res.figure = figure
            }*/
            res.figure = JSON.parse(figure)
        }
        // parse cg
        var cgRegex = /\[cg:(.+\.jpg|0)\]/; //verified
        var cgMatch = dial.match(cgRegex);
        var cg = cgMatch && cgMatch[0];
        if(cg){
            cg = cg.replace(/\[cg: ?/, "")
                .replace(/\]/, "")
        }

        // parse bg
        var bgRegex = /\[bg:(.+\.jpg|0)\]/; //verified
        var bgMatch = dial.match(bgRegex);
        var bg = bgMatch && bgMatch[0];
        if(bg){
            res.bg = bg.replace(/\[bg: ?/, "")
                .replace(/\]/, "")
        }
        // parse bgm
        var bgmRegex = /\[bgm:(.+\.mp3|0)\]/; //verified
        var bgmMatch = dial.match(bgmRegex);
        var bgm = bgmMatch && bgmMatch[0];
        if(bgm){
            res.bgm = bgm.replace(/\[bgm: ?/, "")
                .replace(/\]/, "")
        }
        // last thing : parse dialogue
        res.dialogue = dial.replace(/\[.*\]/g, "");
        return res
    };

    parser.parse = function () {
        parser.splitScript();
        progress = Object.create(result);
        var keys = Object.keys(result);
        for(var key = 0; key < keys.length; key++){
            for(var i = 0; i < result[keys[key]].length; i++){
                result[keys[key]][i] = parser.parseDialogue(result[keys[key]][i])
            }
        }
        return result
    };
    return parser
};

ns.parseScript = function (data) {
    return ns.parser(data).parse()
};

fs.readFile("./test.txt", "utf-8", function (err, data) {
    if(err) throw err;
    data = data.toString().split("\n");
    while(data[data.length-1] == ""){
        data.length--
    }
    var parser = ns.parseScript(data);
    var script = JSON.stringify(parser).replace(/\\r/g, "");
    fs.writeFile("./script.json", script, function (err) {
        if(err) throw err
    })
});