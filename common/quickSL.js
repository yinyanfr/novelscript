/**
 * Created by yan on 2017/4/14.
 */

/*
ns.tmpSL = {
    script: "",
    position: 0
};

ns.quicksave = function () {
    ns.slides.reaction = false;
    ns.tmpSL.script = ns.state.state.script;
    ns.tmpSL.position = ns.state.state.position - 1;
    ns.slides.reaction = true;
};

ns.quickload = function () {
    console.log(ns.tmpSL);
    ns.stage.$dial.finish();
    ns.slides.reaction = false;
    ns.state.state.script = ns.tmpSL.script;
    ns.state.state.position = ns.tmpSL.position;
    ns.state.stack = {};
    ns.slides.jumpScript(ns.state.state.script, ns.state.state.position);
    ns.slides.reaction = true;
    ns.stage.$dial.finish();
    ns.slides.move()
};
*/

ns.quickSL = function () {
    var tmpSL = {};
    var quicksaved = false;
    return [
        function () {
            if(!quicksaved){
                quicksaved = true
            }
            var slide = ns.slides;
            ns.slides.reaction = false;
            tmpSL = $.extend({}, slide.current);
            //console.log(tmpSL.stack);
            ns.slides.reaction = true;
        },
        function () {
            if(quicksaved){
                ns.stage.$dial.finish();
                ns.slides.reaction = false;

                //ns.state.state = $.extend({}, tmpSL.state);
                //ns.state.stack = $.extend({}, tmpSL.stack);
                console.log(tmpSL.state)
                console.log(ns.state.state);
                ns.slides.jumpScript(tmpSL.state.script, tmpSL.state.position);


                ns.slides.reaction = true;
            }
            else {
                console.log("Not yet quicksaved");
            }
        }
    ]
};

