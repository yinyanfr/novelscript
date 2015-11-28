/**
 * Created by Ian on 2015/11/27.
 * requiring jQuery 1.11.3, align.js, preload.js
 * effect plugin diapo for NovelScript 1.0 "Hina"
 * creating a serveral slice of diapo in a vacant element aginst its parent element
 */

/**
 * Create a diaporama
 * @param list : Array of texts, pictures and $
 * @param $stage : $, container of the diapo
 * @param bgColor : string, background color to change if needed
 * @param time : int, time of each slide
 * @param iter : boolean, true if using the iterate method
 * @param stop : boolean, true if diaporama stops when the list is done, when in iterate mode
 */
var diapo = function (list, $stage, bgColor, time, iter, stop) {
    var diapo = {};
    diapo.originBgColor = $stage.css("background-color");
    var isImg = function (element) {
        if(!element.jquery) return element.slice(-3) == "jpg" || element.slice(-3) == "png";
        else return false
    };
    /**
     * preload pictures from the list before launch
     * @param callback
     */
    diapo.preload = function (callback) {
        preloadImgMain(list.filter(isImg), callback)
    };
    diapo.$slide = $("<div></div>").hide();
    diapo.slideRec = function (list, callback) {
        console.log("rec");
        if (!list.length) diapo.recover(callback);
        else {
            var thisSlide = list[0];
            diapo.$slide.html((function () {
                if (isImg(thisSlide)) {
                    return $("<img />").attr("src", thisSlide)
                } else return thisSlide
            })());
            var tmpWidth = diapo.$slide.width();
            Align.full(diapo.$slide);
            diapo.$slide.width(tmpWidth);
            diapo.$slide.fadeIn(time, function () {
                diapo.$slide.fadeOut(time, function () {
                    diapo.slideRec(list.slice(1), callback)
                })
            })
        }
    };
    diapo.slideIter = function (list, callback) {
        console.log("fuck");
        var slideIterate = function (i) {
            var thisSlide = list[i];
            console.log(thisSlide);
            diapo.$slide.html((function () {
                console.log(list);
                console.log(isImg(thisSlide));
                if (isImg(thisSlide)) {
                    return $("<img />").attr("src", thisSlide)
                } else return thisSlide
            })());
            var tmpWidth = diapo.$slide.width();
            Align.full(diapo.$slide);
            diapo.$slide.width(tmpWidth);
            diapo.$slide.fadeIn(time, function () {
                diapo.$slide.delay(2000).fadeOut(1000)
            })
        };
        var counter = function () {
            var i = 0;
            return function () {
                slideIterate(i);
                i++;
                if (i >= list.length){
                    i = 0;
                    if(stop) clearInterval(_iterator)
                }
                console.log(i);
            }
        };
        var _counter = counter();
        setTimeout(_counter, 0);
        var _iterator = setInterval(_counter, 3 * time)
    };
    diapo.recover = function (callback) {
        $stage.css("background-color", diapo.originBgColor);
        callback();
    };
    diapo.execute = function (callback) {
        callback = callback || function(){return 0};
        $stage.append(diapo.$slide);
        Align.full(diapo.$slide);
        $stage.css("background-color", bgColor);
        //TODO problems with preload, preload need deferred paremeters!
        //diapo.preload(function () {
            if (!iter) diapo.slideRec(list, callback);
            else diapo.slideIter(list, callback);
        //})
    };
    return diapo
};

/**
 * Instruction
 */
/*

$(document).ready(function () {
    var l = (function (n) {
        var res = [];
        for(var i = 1; i <= n; i++){
            res.push($("<img />").attr("src", "media/"+i+".jpg")
                .width($(window).width())
                .height($(window).height()))
        }
        return res
    }(4));
    console.log(l);
    var welcome = diapo(l, $("<div></div>").css({
            // f**king safari
            "position": "absolute",
            "top": 0,
            "left": 0
        }).width($(window).width())
            .height($(window).height())
            .appendTo($("body")), "black", 2000, true);
    welcome.execute();
});

    */