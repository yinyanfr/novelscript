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
        if(!position) return data[script];
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
        if(position == 0) return stack;
        var isIncomplete = function (stack) {
            var lack = [];
            if(!stack.figure) lack.push("figure");
            else {
                for(var i = 0; i < stack.figure.length; i++){
                    if(stack.figure == "" || stack.figure == 0){
                        lack.push("cg");
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
        var fix = function (which) {
            var pre;
            for(var i = position; i >= 0; i--){
                pre = dp.get(script, i)[which];
                if(pre[which] && pre[which] != 0){
                    stack[which] = pre[which]
                }
            }
        };
        var fixFigure = function () {
            var figure = [];
            for(var i = 0; i < position; i++){
                var thisFigure = dp.get(script, i).figure;
                if(thisFigure){
                    for(var j = 0; j < thisFigure.length; j++){
                        if(thisFigure[j] != ""){
                            figure[j] = thisFigure[j]
                        }
                    }
                }
            }
            stack.figure = figure;
        };
        // main fix
        for(var i = 0; i < lack.length; i++){
            if(lack[i] == "figure") fixFigure();
            else fix(lack[i])
        }
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

    return dp
};

ns.dp = {};