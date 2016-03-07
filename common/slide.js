/**
 * Created by Ian on 2016/2/28.
 */

ns.slide = function () {
    var slide = {};
    var stack = ns.state.stack;
    var state = ns.state.state;
    var stage = ns.stage;
    var dp = ns.dp;
    var relation = ns.relation;
    /**
     * update the display of a slide
     */
    slide.repaint = function () {
        if(stack.speaker) slide.speaker();
        if(stack.bg) slide.bg();
        if(stack.cg) slide.cg();
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
     * to next position
     */
    slide.next = function () {
        if(stage.position < dp.get(stage.script).length){
            stage.position++;
            var next = dp.get(stage.script, stage.position);
            // speaker, dial
            stack.speaker = next.speaker;
            stack.dialogue = next.dialogue;
            // cg, bg, bgm
            var list = ["cg", "bg", "bgm"];
            (function (l) {
                for(var i = 0; i < l.length; i++){
                    if(next[l[i]]) stack[l[i]] = next[l[i]]
                }
            })(list);
            // figure
            for(var j = 0; j < next.figure.length; j++){
                if(next.figure[j] != "") stack.figure[j] = next.figure[j]
            }
        }
        else{
            var r = relation[stage.script];
            if(r === null) ns.callback();
            else {
                for(var i = 0; i < r.length; i++){
                    if(r[i].condition){
                        slide.changeStack(r[i]);
                        return true
                    }
                }
            }
        }
    };

    slide.speaker = function () {
        stage.$speaker.html(stack.speaker);
    };
    slide.changeBackgroundImage = function (url) {
        stage.$main.css("background-image", "url("+url+")")
    };
    slide.bg = function () {
        slide.changeBackgroundImage(stack.bg)
    };
    slide.cg = function () {
        if(stack.cg === 0 || stack.cg === "0") slide.bg();
        else slide.changeBackgroundImage(stack.cg)
    };
    slide.figure = function () {
        //TODO this is huge
    };

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
        how(stage.$dial, stack.dialogue, 10, function () {
            stage.$main.unbind("click")
                .bind("click", slide.move)
        })
    };
    /**
     * intermediate function for controlling typer
     */
    var stop = function () {
        stage.$dial.finish().html(stack.dialogue);
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