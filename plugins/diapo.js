/**
 * Created by Ian on 2015/11/27.
 * requiring jQuery 1.11.3, align.js, preload.js
 * effect plugin diapo for NovelScript 1.0 "Hina"
 * creating a serveral slice of diapo in a vacant element aginst its parent element
 */

/**
 * Create a diaporama
 * @param list : Array of texts and pictures
 * @param $stage : $, container of the diapo
 * @param bgColor : string, background color to change if needed
 * @param time : int, time of each slide
 * @param iter
 * @param stop
 */
var diapo = function (list, $stage, bgColor, time, iter, stop) {
    var diapo = {};
    diapo.originBgColor = $stage.css("background-color");
    diapo.isImg = function (element) {
        return element.slice(-3) == "jpg" || element.slice(-3) == "png"
    };
    /**
     * preload pictures from the list before launch
     * @param callback
     */
    diapo.preload = function (callback) {
        preloadImgMain(list.filter(diapo.isImg), callback)
    };
    diapo.$slide = $("<div></div>").hide();
    diapo.slideRec = function (list, callback) {
        console.log("rec");
        if (!list.length) diapo.recover(callback);
        else {
            var thisSlide = list[0];
            diapo.$slide.html((function () {
                if (diapo.isImg(thisSlide)) {
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
        var slideIterate = function (i) {
            var thisSlide = list[i];
            diapo.$slide.html((function () {
                if (diapo.isImg(thisSlide)) {
                    return $("<img />").attr("src", thisSlide)
                } else return thisSlide
            })());
            var tmpWidth = diapo.$slide.width();
            Align.full(diapo.$slide);
            diapo.$slide.width(tmpWidth);
            diapo.$slide.fadeIn(time, function () {
                diapo.$slide.fadeOut()
            })
        };

        var counter = function () {
            var i = 0;
            return function () {
                slideIterate(i);
                i++;
                if (i >= list.length) i = 0;
            }
        };
        counter();
        var _iterator = setInterval(counter(), 2 * time)

    };
    diapo.recover = function(callback){
        $stage.css("background-color", diapo.originBgColor);
        callback();
    };
    diapo.execute = function (callback) {
        console.log("hi");
        $("#stage").append(diapo.$slide);
        Align.full(diapo.$slide);
        $stage.css("background-color", bgColor);
        if(!iter) diapo.slideRec(list, callback);
        else diapo.slideIter(list, callback);
    };
    return diapo
};


 var l = ["hgah","dfsgsfdghsf","dgfsdf"];
 var welcome = diapo(l, $("#stage"), "gray", 1000, true);

 $(document).ready(function () {
 welcome.execute(function(){return 0});
 });
