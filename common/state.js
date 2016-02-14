/**
 * Created by yan on 16/2/14.
 */

ns.state = {};
/**
 * defines the way to get the state data from storage
 * which, for NovelScript-light, is from localStorage
 * @param option: Object, for future versions
 */
ns.getStoredState = function (option) {
    return ns.store.local("nsstate")
};

/**
 * import a object that contains information of
 * @param stat
 */
ns.importState = function (stat) {
    ns.state = ns.controls.statePassable(stat) || ns.default.state
};

/**
 * a exemple of the state of novelscript
 * this is JUST an example, as you HAVE TO modify everything in control.js
 * version 0.1
 * @type {{}}
 */
ns.dev.statExample = {
    meta: {
        nsversion: 0.1,
        // version of novelscript
        idkey: "Lixia: the intro of summer"
        // identification of game
    },
    // meta information
    timestamp: "2016-02-14 15:20:00",
    // time
    state: {
        round: 0,
        // time that the game is completed
        paragraph: "id1",
        // name pf present reading
        dialogue: 0
        // position pf paragraph
    }
};