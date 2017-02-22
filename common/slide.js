/**
 * Created by Ian on 2016/2/28.
 */

/**
 * activate the frame
 * @returns {{}}
 */
ns.slide = function () {
    var slide = {};
    var stack = ns.state.stack;
    var state = ns.state.state;
    var stage = ns.stage;
    var dp = ns.dp;
    var relation = ns.relation;
    var resource = ns.resource;
    var theme = ns.controls.theme;
    var history = ns.history;
    var top = theme.dialStyle.top;
    slide.before = null;
    /**
     * update the display of a slide
     */
    slide.repaint = function () {
        //if(stack.speaker)
        slide.speaker();
        if (stack.bg) slide.bg();
        if (stack.cg) slide.cg();
        if (stack.figure && stack.figure.length) slide.figure();
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
        // take condition after
        ns.readyAfter(state.script, state.position);
        var cond = dp.getFromState().condition;
        if(cond && cond.after){
            if(cond.after === false){
                ns.termination();
            }else if(Array.isArray(cond.after)){
                slide.jumpScript(cond.after[0], cond.after[1])
            }
        }

        // then
        slide.before = $.extend({}, stack);
        if (state.position < dp.get(state.script).length - 1) {
            state.position++;
            var next = dp.get(state.script, state.position);
            // speaker, dial
            stack.speaker = next.speaker;
            stack.dialogue = next.dialogue;
            // cg, bg, bgm
            var list = ["cg", "bg", "bgm"];
            (function (l) {
                for (var i = 0; i < l.length; i++) {
                    if (next[l[i]]) stack[l[i]] = next[l[i]]
                }
            })(list);
            // figure
            if (next.figure) {
                for (var j = 0; j < next.figure.length; j++) {
                    if (next.figure[j] != "") stack.figure[j] = next.figure[j]
                }
                var tmp = [];
                for (j = 0; j < stack.figure.length; j++) {
                    if (stack.figure[j] !== 0 && stack.figure[j] !== "0") {
                        tmp.push(stack.figure[j])
                    }
                }
                stack.figure = tmp.slice()
            }
        }
        else {
            var r = relation[state.script];
            if (r === null) ns.$deferred.resolve();
            else {
                for (var i = 0; i < r.length; i++) {
                    if (r[i].condition) {
                        slide.changeStack(r[i].child, r[i].position);
                        return true
                    }
                }
            }
        }
    };

    slide.speaker = function () {
        if (!stack.speaker) {
            stage.$speaker.hide()
        } else {
            stage.$speaker.html(stack.speaker)
                .show();
        }
    };
    slide.changeBackgroundImage = function (url) {
        if (!slide.before) {
            stage.$bg.css("background-image", "url(" + url + ")")
        } else if (slide.before.cg != stack.cg || slide.before.bg != stack.bg) {
            /*
            stage.$bg.show().css({
                    "background-image": "url(" + url + ")",
                    filter: "blur(30px)"
                    //transform: "scale(2)"
                })
                .animate({
                    opacity: "0.5"
                }, 500, function () {
                    stage.$bg.css({
                            "background-image": "url(" + url + ")",
                            filter: "blur(0px)"
                            //transform: "scale(1)"
                        })
                        .animate({
                            opacity: "1"
                        }, 500)
                })
                */
            stage.$bg.show().css({
                "background-image": "url(" + url + ")"
            })
        }

        if (slide.before) {
            //console.log(slide.before.dialogue)
            //console.log(stack.dialogue)
        }
    };
    slide.bg = function () {
        if (stack.bg === 0 || stack.bg === "0") {
            stage.$main.css("background-image", "none");
            stage.$bg.fadeOut("fast")
        }
        else slide.changeBackgroundImage(ns.resource.get("bg", stack.bg))
    };
    slide.cg = function () {
        if (stack.cg === 0 || stack.cg === "0") {
            slide.bg();
            stage.$figure.show();
        }
        else {
            stage.$figure.hide();
            slide.changeBackgroundImage(ns.resource.get("cg", stack.cg))
        }
    };
    slide.figures = [];
    slide.figure = function () {
        slide.figures = [];
        stage.$figure.html("");
        for (var i = 0; i < stack.figure.length - 1; i++) {
            slide.figures.push(ns.resource.get("figure", stack.figure[i]));
            //.css("float", "left"))
        }
        slide.figures.push(ns.resource.get("figure", stack.figure[i]));
        for (i = 0; i < slide.figures.length; i++) {
            slide.figures[i].css(ns.controls.theme.figureImageStyle)
                .appendTo(stage.$figure)
        }
    };

    var dial = stack.dialogue;

    /**
     * main: make a display to the screen
     */
    slide.move = function () {
        var move = function () {
            var merge = dp.getFromState().merge;
            if(merge){
                slide.repaint();
                stage.$dial.html(dp.getFromState().dialogue);
                slide.deactive();
                var mergeBody = dp.getFromState().mergeBody;
                var mergeFunctions = dp.getFromState().mergeFunctions;
                stage.$merge.html("").show();
                for(var i = 0; i < mergeBody.length; i++){
                    (function (j) {
                        if(mergeFunctions[mergeBody[j]].condition){
                            stage.$merge.append($("<div></div>")
                                .css(theme.choiceStyle)
                                .html(mergeBody[j])
                                .click(function (event) {
                                    event.stopPropagation();
                                    slide.active();
                                    stage.$merge.hide();
                                    mergeFunctions[mergeBody[j]].callback()
                                }))
                        }else if(mergeFunctions[mergeBody[i]].gray){
                            stage.$merge.append($("<div></div>")
                                .css(theme.choiceStyle)
                                .css("background-color", "rgba(0, 0, 0, 0.2)")
                                .html(mergeBody[j]))
                        }
                    })(i)
                }
            }else {
                dial = stack.dialogue; // update dial
                //TODO merge and effect(0.2)
                var how = ns.typer.flush;
                stage.$dial.html("");
                stage.$main.unbind("click")
                    .bind("click", stop);
                slide.repaint();
                how(stage.$dial, dial, 20, function () {
                    stage.$main.unbind("click")
                        .bind("click", slide.move)
                });
                slide.next();
                //console.log(stack)
            }
        };
        // effect
        var effectTaking = function () {
            history.pushAll(stack);
            console.log(history.novel.stack);
            if(theme.novelMode){
                stage.$dialPrepend.html("").show();
                stage.$dial.css({
                    top: top * ((function (n) {
                        if(n > 0) return 2 * n + 1;
                        else return 1
                    })(history.novel.stack.length - 1))
                });
                if(history.novel.stack.length > 1){
                    for(var i = 0; i < history.novel.stack.length - 1; i++){
                        var tmp = history.novel.stack[i];
                        stage.$dialPrepend.append($("<div></div>")
                            .html(tmp.dialogue)
                            .css({
                                "margin-top": top
                            }))
                    }
                }
            }
            var effect = dp.getFromState().effect;
            if(effect){
                var type = effect.effectType;
                if(!type || !type.sync){
                    slide.deactive();
                    if(type && !type.deffered){
                        effect.execute(function () {
                            slide.active();
                            move();
                        })
                    }else {
                        $.when(effect.execute())
                            .done(function () {
                                slide.active();
                                move();
                            })
                    }
                }else {
                    if(type && type.sync){
                        effect.execute();
                        move()
                    }
                }
            }else {
                move()
            }
        };
        // condition
        var condition = function () {
            ns.readyBefore(state.script, state.position);
            var cond = dp.getFromState().condition;
            if(!cond) effectTaking();
            else if(cond && cond.before) effectTaking();
            else slide.next()
        };
        condition()
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

    slide.active = function () {
        stage.$main.bind("click", slide.move);
    };

    slide.deactive = function () {
        stage.$main.unbind("click")
    };

    //slide.active();
    return slide
};

ns.slides = {};
