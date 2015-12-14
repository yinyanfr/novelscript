/**
 * Created by yan on 15/12/14.
 */

/**
 * give a notification window, first in first out
 * @param style: {}, css style
 * @returns {Function}
 */
var don = function (style) {
    style = style || {
            "border": "1px solid black",
            "height": 200,
            "width": 200
        };
    //TODO enhance the style
    var queue = [];
    var flag = true;
    var $block = $("<div></div>").css(style)
        .appendTo($("body"))
        .align("fullscreen")
        .hide();
    var $content = $("<div></div>").appendTo($block);
    var $ok = $("<button></button>").html("ok")
        .appendTo($block)
        .click(function (event) {
            event.stopPropagation();
            if(flag){
                queue.pop();
                flag = false
            }
            if(queue.length){
                console.log(queue);
                $content.html(queue.pop());
                console.log(queue);
            }
            else{
                $block.hide();
                flag = true
            }
        });
    return function ($note) {
        queue.unshift($note);
        $content.html(queue[queue.length - 1]);
        $block.show();
    }
};
