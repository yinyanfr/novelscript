/**
 * Created by yan on 16/2/14.
 */

// TODO automatic resource collector
ns.media = {
    images: [],
    audios: []
};

/**
 * TODO modify the condition to pass a state object to program and declination otherwise
 * @param state
 * @returns {boolean}
 */
ns.controls.statePassable = function (state) {
    if(true){

        return state
    }else return false
};
/*
ns.initControls = function (setting) {
    setting = setting || ns.default.setting;
    ns.controls.theme = setting.theme;
    // relation amang scripts paragraphes
    ns.controls.relation = setting.relation

};*/

ns.initControls = function (setting) {
    setting = setting || ns.default.setting;
    ns.controls.theme = ns.ui.themes[setting.theme];
    // relation amang scripts paragraphes
    ns.controls.relation = {
        /*
         script1: [
         {
         condition: true,
         child: "script2"
         }
         ]
         */
    };

};