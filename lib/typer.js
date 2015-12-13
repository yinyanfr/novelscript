/**
 * Created by Ian on 2015/5/21.
 */
var typer = (function () {
    var typer = {};


    typer.given = function ($selecter, text, f) {
        $selecter.append(text);
        f=f||function(){return 0};
        f()
    };

    typer.typing = function ($selecter, string, speed, f) {
        string = " "+string;
        speed = speed||100;
        f=f||function(){return 0};
        var aux = function ($selecter, list, f) {
            $selecter.append(list.shift()).delay(speed).queue(function () {
                if (list.length === 0) {
                    f()
                } else {
                    aux($selecter, list, f)
                }
                $(this).dequeue()
            });
        };
        aux($selecter, string.split(''), f)
    };

    typer.flush = function ($selecter, string, speed, f) {
        string = " "+string;
        speed = speed||10;
        f=f||function(){return 0};
        var aux = function ($selecter, list, f) {
            $selecter.append($("<span></span>").html(list.shift()).fadeIn(speed)).delay(speed).queue(function () {
                if (list.length === 0) {
                    f()
                } else {
                    aux($selecter, list, f)
                }
                $(this).dequeue()
            });
        };
        aux($selecter, string.split(''), f)

    };

    typer.wait = function ($selecter, time, f) {
        f=f||function(){return 0};
        $selecter.append("<span id='typewait' style='display:none'>_</span>");
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
    return typer
})();
