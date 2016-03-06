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
            if(!stack.cg || stack.cg == 0) lack.push("cg");
            if(!stack.bg || stack.bg == 0) lack.push("bg");
            if(!stack.bgm || stack.bgm == 0) lack.push("bgm");
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
            //TODO
        };
        // main fix
        for(var i = 0; i < lack.length; i++){
            if(lack[i] == "figure") fixFigure();
            else fix(lack[i])
        }
        return stack
    };
    return dp
};

ns.dp = {};