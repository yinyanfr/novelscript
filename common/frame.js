/**
 * Created by Ian on 2016/2/27.
 */

/**
 * HUGE CHANGE: ns.ui.frame() now serves to directly overides ns.stage
 * @param theme
 */
ns.frame = function (theme) {
    var width = ns.$frame.width();
    var height = ns.$frame.height();
    // mainstage
    if(theme){
        ns.controls.theme = theme
    }else{
        theme = ns.controls.theme
    }
    (function (stage) {
        stage.$main = $("<div></div>")
            .css(theme.mainstageStyle);

        stage.$bg = $("<div></div>")
            .css({
                width: width,
                height: height,
                transition: "all 0.5s",
                "background-size": "100% 100%"
            })
            .appendTo(stage.$main);

        stage.$figure = $("<div></div>").css(theme.figureStyle)
            .appendTo(stage.$main);

        stage.$content = $("<div></div>")
            .css(theme.contentStyle)
            .appendTo(stage.$main);

        stage.$dialogue = $("<div></div>")
            .css(theme.dialogueStyle)
            .appendTo(stage.$content);

        stage.$speaker = $("<h2></h2>")
            .css(theme.speakerStyle)
            .html("进度条")
            .appendTo(stage.$content);

        stage.$dialPrepend = $("<div></div>")
            .css(theme.dialStyle)
            .html("少女加载中")
            .appendTo(stage.$content);

        stage.$dial = $("<p></p>")
            .css(theme.dialStyle)
            .html("少女加载中")
            .appendTo(stage.$content);

        stage.$merge = $("<div></div>")
            .css(theme.mergeStyle)
            .appendTo(stage.$main)
            .hide();
    })(ns.stage);

};

ns.stage = {};