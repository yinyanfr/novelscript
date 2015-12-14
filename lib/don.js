/**
 * Created by yan on 15/12/14.
 */

/**
 * closure function don
 */
var don = function () {
    var queue = [];
    var flag = true;
    var $block = $("<div></div>").css({
            "border": "1px solid black",
            "height": 200,
            "width": 200
        })
        .appendTo($("body"))
        .align("fullscreen")
        .hide();
    var $content = $("<div></div>").appendTo($block);
    var $ok = $("<button></button>").html("ok")
        .appendTo($block)
        .click(function (event) {
            event.stopPropagation();
            if(flag){
                queue.shift();
                flag = false
            }
            if(queue.length){
                console.log(queue);
                $content.html(queue.shift());
                console.log(queue);
            }
            else{
                $block.hide();
                flag = true
            }
        });
    return function ($note) {
        //console.log($block.html());
        queue.unshift($note);
        $content.html($note);
        //console.log(queue);
        $block.show();
    }
};
