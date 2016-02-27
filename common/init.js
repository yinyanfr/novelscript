/**
 * Created by yan on 16/2/14.
 */

ns.init = function (data, $frame) {
    if(!data) throw "failed to load script data.";
    ns.data = data;
    ns.$frame = $frame || $("body");
    console.log(ns.$frame.css("height"));
    // import state
    ns.importState(ns.getStoredState());
    // form frame ui
    ns.ui.initTheme({
        width: ns.$frame.width(),
        height: ns.$frame.height()
    });
    ns.initControls();
    ns.$stage = ns.ui.frame().$main.appendTo($frame)
};