/**
 * Created by Ian on 2016/3/6.
 */

/**
 * dp = data processor
 * @param data: Obj, scriptObject
 */
ns.initDp = function (data) {
    var dp = {};
    dp.get = function (script, position) {
        if(position === undefined) return data[script];
        else return data[script][position]
    };
    dp.getFromState= function () {
        return dp.get(ns.state.state.script, ns.state.state.position)
    };
    /**
     * fix stack when jumpScript is called
     * @param script
     * @param position
     */
    dp.stackFix = function (script, position) {
        var stack = dp.get(script, position);
        if(position == 0){
            return stack;
        }
        var isIncomplete = function (stack) {
            var lack = [];
            if(!stack.figure) lack.push("figure");
            else {
                for(var i = 0; i < stack.figure.length; i++){
                    if(stack.figure[i] === "" || stack.figure[i] === 0){
                        lack.push("figure");
                        break;
                    }
                }
            }
            if(!stack.cg) lack.push("cg");
            if(!stack.bg) lack.push("bg");
            if(!stack.bgm) lack.push("bgm");
            if(!lack.length) return false;
            else return lack;
        };
        var lack = isIncomplete(stack);
        if(!lack) return stack;
        var fix = function () {
            var figure = [];
            for(var i = 0; i <= position; i++){
                var thisFigure = dp.get(script, i).figure;
                if(thisFigure){
                    for(var j = 0; j < thisFigure.length; j++){
                        if(thisFigure[j] != ""){
                            figure[j] = thisFigure[j]
                        }
                    }
                }
                var thisCg = dp.get(script, i).cg;
                if(thisCg){
                    stack.cg = thisCg
                }
                var thisBg = dp.get(script, i).bg;
                if(thisBg){
                    stack.bg = thisBg
                }
                var thisBgm = dp.get(script, i).bgm;
                if(thisBg){
                    stack.bgm = thisBgm
                }
            }
            var tmp = [];
            for (j = 0; j < figure.length; j++) {
                if (figure[j] !== 0 && figure[j] !== "0") {
                    tmp.push(figure[j])
                }
            }
            stack.figure = tmp;
        };
        // main fix
        fix();
        return stack
    };

    dp.resourceCollector = function (data) {
        data = data || ns.data;
        var media = {};
        media.images = [];
        media.audios = [];
        // resource collector version front-end
        var keys = Object.keys(data);
        for(var key = 0; key < keys.length; key++){
            var script = data[Object.keys[data][key]];
            for(var i = 0; i < script.length; i++){
                // figure
                for(var figure = 0; figure < script[i].figure.length; figure++){
                    var f = script[i].figure[figure];
                    if(f && (!media.images.indexOf(f))) media.images.push(f)
                }
                // cg, bg, bgm
                var cg = script[i].cg;
                if(cg && (!media.images.indexOf(cg))) media.images.push(cg);
                var bg = script[i].bg;
                if(bg && (!media.images.indexOf(bg))) media.images.push(bg);
                var bgm = script[i].bgm;
                if(bgm && (!media.audios.indexOf(bgm))) media.audios.push(bgm);
            }
        }
        return media
    };

    dp.firstScript = function () {
        return data[Object.keys(data)[0]]
    };

    /**
     * Go throughout the whole data, and do f to each page
     * @param f
     */
    dp.throughout = function (f) {
        var keys = Object.keys(data);
        for(var i = 0; i < keys.length; i++){
            var script = data[keys[i]];
            for(var j = 0; j < script.length; j++){
                f(script[j])
            }
        }
    };

    return dp
};

ns.dp = {};