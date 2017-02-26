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
    if (ns.state.state.round === undefined || ns.state.state.round === null) ns.initState();
    // form frame ui
    ns.ui.initTheme({
        width: ns.$frame.width(),
        height: ns.$frame.height()
    });
    ns.initControls(setting);
    ns.relation = ns.initRelation();
    // init the default theme for the reference of others
    var tempTheme = $.extend({}, ns.controls.theme);
    ns.ui.frame(ns.ui.themes.default);
    ns.ui.frame(tempTheme);
    ns.stage.$main.appendTo(ns.$frame);
    ns.slides = ns.slide();
    ns.resource = ns.initResource(setting);
    ns.merge = ns.initMerge();
    ns.director();
    ns.merge.listNonDistrib();

    var testlist = ["anzu.jpg", "anzu2.jpg", "anzu_b.png", "anzu_l.png", "anzu_n.png", "classroom.jpg", "koharu.jpg",
        "otome1.png", "otome2.png", "otome3.png", "restaurant.jpg", "room.jpg", "sf.png",
        "yume1.png", "yume2.png", "yume3.png"];

    var $lb = ns.loadingbar(testlist, "tmp/e/", function () {
        $lb.remove();
        ns.start();
        ns.$frame.children().show();
    });

    ns.$frame.children().hide(0, function () {
        $lb.appendTo(ns.$frame).align("full")
    });

};