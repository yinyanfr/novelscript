/**
 * Created by yan on 16/2/14.
 */

/**
 * init a novelscript example
 * @param data
 * @param $frame
 * @param setting
 */
ns.init = function (data, $frame, setting) {
    ns.$deferred = $.Deferred();
    if (!data) throw "failed to load script data.";
    ns.data = data;
    ns.$frame = $frame || $("body");
    // init data
    ns.dp = ns.initDp(ns.data); // data processor (which is closed though) should not not modify any data
    // import state
    ns.importState(ns.getStoredState());
    // init state if needed
    if (!ns.state.state.round) ns.initState();
    // form frame ui
    ns.ui.initTheme({
        width: ns.$frame.width(),
        height: ns.$frame.height()
    });
    ns.initControls(setting);
    ns.relation = ns.initRelation();
    ns.stage = ns.ui.frame();
    ns.stage.$main.appendTo(ns.$frame);
    ns.slides = ns.slide();
    ns.resource = ns.initResource(setting);
    ns.merge = ns.initMerge();
    ns.director();
    ns.merge.listNonDistrib();
    // ns.start();
    /*
    var queue = new createjs.LoadQueue();
    (function () {
        var n = 1;
        queue.on("fileload", function () {
            ns.stage.$dial.html("图片加载中"+n+"/"+testlist.length);
            n++
        })
    })();
    queue.on("complete", function () {
        ns.start()
    }, this);
    */
    var testlist = ["anzu.jpg", "anzu2.jpg", "anzu_b.png", "anzu_l.png", "anzu_n.png", "classroom.jpg", "koharu.jpg",
        "otome1.png", "otome2.png", "otome3.png", "restaurant.jpg", "room.jpg", "sf.png",
        "yume1.png", "yume2.png", "yume3.png"];
    /*
    for(var i = 0; i < testlist.length; i++){
        queue.loadFile("tmp/e/"+testlist[i]);
    }
    */
    var n = 1;
    ns.preload(testlist, "tmp/e/", function () {
        ns.stage.$dial.html("图片加载中"+n+"/"+testlist.length);
        n++
    }, function () {
        ns.start()
    })

};