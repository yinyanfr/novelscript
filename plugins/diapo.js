/**
 * Created by Ian on 2015/11/27.
 * requiring jQuery 1.11.3, align.js
 * effect plugin diapo for NovelScript 1.0 "Hina"
 * creating a serveral slice of diapo in a vacant element aginst its parent element
 * for furthur document, please see readme
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
ns.diapo = function (list, $stage, bgColor, time, iter, stop) {
    var diapo = {};
    diapo.originBgColor = $stage.css("background-color");
    var isImg = function (element) {
        if (!element.jquery) return element.slice(-3) == "jpg" || element.slice(-3) == "png";
        else return false
    };
    diapo.$slide = $("<div></div>").hide()
        .css({
            width: "100%",
            "text-align": "center",
            color: "white",
            "font-size": "300%"
        });
    diapo.slideRec = function (list, callback) {
        if (!list.length) diapo.recover(callback);
        else {
            var thisSlide = list[0];
            diapo.$slide.html((function () {
                if (isImg(thisSlide)) {
                    return $("<img />").attr("src", thisSlide)
                } else return thisSlide
            })());
            var tmpWidth = diapo.$slide.width();
            diapo.$slide.align("full");
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
                if (isImg(thisSlide)) {
                    return $("<img />").attr("src", thisSlide)
                } else return thisSlide
            })());
            var tmpWidth = diapo.$slide.width();
            diapo.$slide.align("full");
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
                if (i >= list.length) {
                    i = 0;
                    if (stop) clearInterval(_iterator)
                }
            }
        };
        var _counter = counter();
        setTimeout(_counter, 0);
        var _iterator = setInterval(_counter, 3 * time)
    };
    diapo.recover = function (callback) {
        $stage.children().show();
        $stage.css("background-color", diapo.originBgColor);
        diapo.$slide.remove();
        callback();
    };
    diapo.execute = function (callback) {
        $stage.children().hide();
        callback = callback || function () {
                return 0
            };
        $stage.append(diapo.$slide);
        diapo.$slide.align("full");
        $stage.css("background-color", bgColor);
        if (!iter) diapo.slideRec(list, callback);
        else diapo.slideIter(list, callback);
    };
    return diapo
};
