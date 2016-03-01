/**
 * Created by Ian on 2016/2/28.
 */

ns.slide = function () {
    var slide = {};
    var stack = ns.state.stack;
    var state = ns.state.state;
    var stage = ns.stage;
    slide.speaker = function () {
        stage.$speaker.html(stack.speaker)
    };
    /**
     * use ns.typer to make dialogues dynamic
     * ns.typer is async so that special treatments are introduced
     * TODO adapt ns.typer with $.Deffered()
     * @param how : function, how dialogue are displayed
     */
    slide.dial = function (how) {
        how = how || ns.default.dialogueDisplay; // which is, ns.typer.flush
        var dial = stack.dialogue;
        var move = function () {
            stage.$dial.html("");
            stage.$main.unbind("click")
                .bind("click", stop);
            how(stage.$dial, dial, 10, function () {
                stage.$main.unbind("click")
                    .bind("click", move)
            })
        };
        var stop = function () {
            stage.$dial.finish().html(dial);
            stage.$main.unbind("click")
                .bind("click", move)
        };
        stage.$main.bind("click", move)
    };
    /**
     * update the displat of a slide
     */
    slide.repaint = function () {

    }
};

ns.slides = {};