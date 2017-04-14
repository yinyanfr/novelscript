/**
 * Created by Ian on 2016/4/2.
 */

/**
 * TODO ns.start
 * start the galgame from script and position given
 * @param script
 * @param position
 */
ns.start = function (script, position) {
    var dp = ns.dp;
    var slide = ns.slides;
    var stage = ns.stage;
    script = script || dp.firstScriptName();
    position = position || 0;

    slide.changeStack(script, position);
    ns.$frame.children().show();
    stage.$optionPanel = ns.panel();
    stage.$optionPanel.appendTo(stage.$main);
    ns.qsl = ns.quickSL();
    ns.quicksave = ns.qsl[0];
    ns.quickload = ns.qsl[1];
    stage.$sidebar = ns.sidebar([
        $("<button>Q.Save</button>").click(function (event) {
            event.stopPropagation();
            //alert("clicked");
            ns.quicksave();
        }),
        $("<button>Q.load</button>").click(function (event) {
            event.stopPropagation();
            //alert("clicked");
            ns.quickload();
        }),
        $("<button>Menu</button>").click(function (event) {
        event.stopPropagation();
        //alert("clicked");
        stage.$optionPanel.open()
    })])
        .appendTo(stage.$content);
    slide.move();

};