/**
 * Created by yan on 16/4/28.
 */

/**
 * repack from preloadjs of createjs
 * @param list
 * @param path
 * @param each
 * @param callback
 * @returns {*}
 */
ns.preload = function (list, path, each, callback) {
    path = path || "";
    var def = $.Deferred();
    var queue = new createjs.LoadQueue();
    if(each){
        queue.on("fileload", each)
    }
    queue.on("complete", function () {
        def.resolve();
        if (callback) {
            callback()
        }
    });
    for (var i = 0; i < list.length; i++) {
        queue.loadFile(path + list[i])
    }

    return def.promise()
};

/**
 * init a loadingbar
 * @param list
 * @param path
 * @param callback
 * @returns {*|jQuery|HTMLElement}
 */
ns.loadingbar = function (list, path, callback) {
    var theme = ns.controls.theme;
    path = path || "";
    var $lb = $("<div></div>");
    var $lbInterne = $("<div></div>").appendTo($lb);
    if (theme.loadingbarStyle) {
        $lb.css(theme.loadingbarStyle)
    } else {
        $lb.css({
                width: "100px",
                height: "10px",
                border: "2px solid black",
                "background-color": "black"
            });
            //.align("full")
    }
    if (theme.loadingbarInterneStyle) {
        $lbInterne.css(theme.loadingbarInterneStyle)
    } else {
        $lbInterne.css({
            width: 0,
            height: "inherit",
            "background-color": "white"
        })
    }
    var step = $lb.width() / list.length;
    var each = function () {
        $lbInterne.width($lbInterne.width() + step)
    };
    ns.preload(list, path, each, function () {
        if (callback) {
            callback()
        }
    });

    return $lb
};