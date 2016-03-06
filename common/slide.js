/**
 * Created by Ian on 2016/2/28.
 */

ns.slide = function () {
    var slide = {};
    var stack = ns.state.stack;
    var state = ns.state.state;
    var stage = ns.stage;
    /**
     * update the displat of a slide
     */
    slide.repaint = function () {
        slide.speaker();
    };
    /**
     * change to another script, with position defined or 0
     * @param script
     * @param position
     */
    slide.changeStack = function (script, position) {
        if (!script) throw "No target for slide.jumpScript.";
        position = position || 0;
        state.script = script;
        state.position = position;
        stack = ns.dp.stackFix(script, position);
    };
    /**
     * jump to another script, with position defined or 0
     * @param script
     * @param position
     */
    slide.jumpScript = function (script, position) {
        slide.changeStack(script, position);
        slide.move()
    };
    /**
     * TODO for next time
     */
    slide.next = function () {

    };

    slide.speaker = function () {
        stage.$speaker.html(stack.speaker)
    };

    var dial = stack.dialogue;
    /**
     * main: make a display to the screen
     */
    slide.move = function () {
        //TODO merge and effect(0.2)
        var how = ns.typer.flush;
        stage.$dial.html("");
        stage.$main.unbind("click")
            .bind("click", stop);
        slide.repaint();
        slide.next();
        how(stage.$dial, dial, 10, function () {
            stage.$main.unbind("click")
                .bind("click", slide.move)
        })
    };
    /**
     * intermediate function for controlling typer
     */
    var stop = function () {
        stage.$dial.finish().html(dial);
        stage.$main.unbind("click")
            .bind("click", slide.move)
    };
    /**
     * bind the function
     */
    stage.$main.bind("click", slide.move);
    return slide
};

ns.slides = {};