/**
 * Created by yan on 16/2/14.
 */

ns.init = function (data, $frame) {
    if(!data) throw "failed to load script data.";
    ns.data = data;
    ns.$frame = $frame || $("body");
    console.log(ns.$frame.css("height"));
    // init data
    ns.dp = ns.initDp(Object.create(ns.data)); // data processor (which is closed though) should not not modify any data
    // import state
    ns.importState(ns.getStoredState());
    // init state if needed
    if(!ns.state.round) ns.initState();
    // form frame ui
    ns.ui.initTheme({
        width: ns.$frame.width(),
        height: ns.$frame.height()
    });
    ns.initControls();
    ns.relation = ns.initRelation();
    ns.$stage = ns.ui.frame().$main.appendTo($frame);
    ns.slides = ns.slide();
};