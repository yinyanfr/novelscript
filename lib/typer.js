/**
 * Created by Ian on 2015/5/21.
 */

var typer = {};


typer.given = function (selector, text, f) {
    $(selector).append(text);
    f=f||function(){return 0};
    f()
};

typer.typing = function (selector, string, speed, f) {
    string = " "+string;
    speed = speed||100;
    f=f||function(){return 0};
    var aux = function (selector, list, f) {
        $(selector).append(list.shift()).delay(speed).queue(function () {
            if (list.length === 0) {
                f()
            } else {
                aux(selector, list, f)
            }
            $(this).dequeue()
        });
    };
    aux(selector, string.split(''), f)
};

typer.flush = function (selector, string, speed, f) {
    string = " "+string;
    speed = speed||10;
    f=f||function(){return 0};
    var aux = function (selector, list, f) {
        $(selector).append($("<span></span>").html(list.shift()).fadeIn(speed)).delay(speed).queue(function () {
            if (list.length === 0) {
                f()
            } else {
                aux(selector, list, f)
            }
            $(this).dequeue()
        });
    };
    aux(selector, string.split(''), f)

};

typer.wait = function (selector, time, f) {
    f=f||function(){return 0};
    $(selector).append("<span id='typewait' style='display:none'>_</span>");
    var aux = function(time,f){
        $("#typewait").show().delay(800).hide(300,function(){
            if(time === 1){
                f()
            }else{
                aux(time-1,f)
            }
            //$(this).dequeue()
        });
    };
    aux(time,f)
};