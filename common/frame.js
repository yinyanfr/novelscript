/**
 * Created by Ian on 2016/2/27.
 */

ns.ui.frame = function () {
    var width = ns.$frame.width();
    var height = ns.$frame.height();
    // mainstage
    var stage = {};
    var theme = ns.controls.theme;

    stage.$main = $("<div></div>")
        .css(ns.controls.theme.mainstageStyle);

    stage.$bg = $("<div></div>")
        .css({
            width: width,
            height: height,
            transition: "all 0.5s",
            "background-size": "100% 100%"
        })
        .appendTo(stage.$main);

    stage.$figure = $("<div></div>").css(ns.controls.theme.figureStyle)
        .appendTo(stage.$main);

    stage.$content = $("<div></div>")
        .css(ns.controls.theme.contentStyle)
        .appendTo(stage.$main);

    stage.$dialogue = $("<div></div>")
        .css(ns.controls.theme.dialogueStyle)
        .appendTo(stage.$content);

    stage.$speaker = $("<h2></h2>")
        .css(ns.controls.theme.speakerStyle)
        .html("进度条")
        .appendTo(stage.$content);

    stage.$dial = $("<p></p>")
        .css(ns.controls.theme.dialStyle)
        .html("少女加载中")
        .appendTo(stage.$content);

    stage.$merge = $("<div></div>")
        .css(theme.mergeStyle)
        .appendTo(stage.$main)
        .hide();

    return stage
};

ns.stage = {};