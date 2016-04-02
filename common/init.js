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
    // ns.start();

};