/**
 * Created by yan on 15/11/28.
 * plugin of NovelScript 1.0 "Hina"
 * jquery 1.11 needed
 */

/**
 * plugin NovelScript, target will shrink with mouse or automatically
 * TODO bugs remaining
 * @param $target : $, target that will shrink
 * @param limit : float, rate that target react against the movement of mouse
 * @param auto : boolean, true if target will shrink automatically
 * @param time : int, frequency of movement when automatically
 */
function shrink($target, limit, auto, time){
    var shrink = {};
    var randint = function(start, end){
        return start + (end - start) * Math.random()
    };
    /**
     * function io rec, movement when moving automatically
     * @param x
     * @param y
     * @param time
     */
    shrink.move = function (x, y, time) {
        $target.animate({
            "left": "+="+x,
            "top": "+="+y
        }, time)
    };
    shrink.execute = function(callback){
        $target.width($(window).width() * (1 + limit))
            .height($(window).height() * (1 + limit));
        if(auto){
            // use interval to move
            setInterval(function () {
                var x = randint(0, $(window).width());
                var y = randint(0, $(window).height());
                shrink.move(x, y, time)
            }, time)
        }else{
            // move listening to mouse
            $target.mousemove(function (event) {
                event.stopPropagation();
                $target.css({
                    "left": "-=" + ($target.width() - event.pageX) - $(window).width(),
                    "top": "-=" + ($target.height() - event.pageY) - $(window).height()
                })
            })
        }
        if(callback){
            $target.one("click", function (event) {
                event.stopPropagation();
                callback();
            })
        }
    };
    return shrink
}
