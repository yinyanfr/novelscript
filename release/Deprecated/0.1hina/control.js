/**
 * Released version of controls, at version 0.1
 */

/**
 * Important: Althrough multiple keys are leaving for future versions,
 * None of them is safe to remove
 * Because future versions are already being developped and reacted to some extends in this current version
 */


// TODO for version 0.3 automatic resource collector
ns.media = {
    images: [],
    audios: []
};

/**
 * TODO for version 0.3 modify the condition to pass a state object to program and declination otherwise
 * @param state
 * @returns {boolean}
 */
ns.controls.statePassable = function (state) {
    if(true){

        return state
    }else return false
};

ns.initControls = function (setting) {
    setting = setting || ns.default.setting;
    ns.controls.theme = ns.ui.themes[setting.theme];
    // relation amang scripts paragraphes
    ns.controls.relation = {
        /* TODO for version 0.2
         */
    };
};