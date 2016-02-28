/**
 * Created by yan on 16/2/14.
 */

ns.default.state = {
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
        round: null,
        // time that the game is completed
        script: "id01",
        // name pf present reading
        position: 0
        // position pf paragraph
    },
    stack: {
        speaker: null,
        dialogue: "",
        cg: [],
        bg: 0,
        bgm: 0
    }
};

