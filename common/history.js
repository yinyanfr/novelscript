/**
 * Created by yan on 2017/2/22.
 */

ns.history = (function () {
    var history = {};
    history.stack = [];
    history.push = function (stack) {
        history.stack.push($.extend({}, stack))
    };

    history.novel = {
        limit: 5,
        stack: []
    };
    history.novel.push = function (stack) {
        var n = history.novel;
        n.stack.push($.extend({}, stack));
        if(n.stack.length > n.limit){
            n.stack.length = 0
        }
    };

    history.pushAll = function (stack) {
        history.push(stack);
        history.novel.push(stack);
    };


    return history;
})();