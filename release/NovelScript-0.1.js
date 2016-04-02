/**
 * NovelScript 0.1 "hina", uncompressed version
 */

(function ($) {
    var Align = {}; // Simple Package

    Align.setPositionRelative = function ($selector) {
        $selector.css("position", "relative");
    };

    Align.setPositionAbsolute = function ($selector) {
        $selector.css("position", "absolute");
    };

    Align.getReletiveLeft = function ($selector) {
        var parent = $selector.parent();
        return (parent.width() - $selector.width()) / 2;
    };

    Align.getWindowLeft = function ($selector) {
        return ($(window).width() - $selector.width()) / 2;
    };

    Align.getReletiveTop = function ($selector) {
        var parent = $selector.parent();
        return (parent.height() - $selector.height()) / 2;
    };

    Align.getWindowTop = function ($selector) {
        return ($(window).height() - $selector.height()) / 2;
    };

    Align.horizontal = function ($selector) {
        Align.setPositionRelative($selector);
        $selector.css("left", Align.getReletiveLeft($selector));
    };

    Align.vertical = function ($selector) {
        Align.setPositionRelative($selector);
        $selector.css("top", Align.getReletiveTop($selector));
    };

    Align.fullHorizontal = function ($selector) {
        Align.setPositionAbsolute($selector);
        $selector.css("left", Align.getWindowLeft($selector));
    };

    Align.fullVertical = function ($selector) {
        Align.setPositionAbsolute($selector);
        $selector.css("top", Align.getWindowTop($selector));
    };

    Align.full = function ($selector) {  // Align horizontal and vertical against its parent element
        Align.setPositionRelative($selector);
        $selector.css("left", Align.getReletiveLeft($selector));
        $selector.css("top", Align.getReletiveTop($selector));
    };

    Align.fullscreen = function ($selector) { // Align horizontal and vertical fullscreen when there's nothing else shown
        Align.setPositionAbsolute($selector);
        $selector.css("left", Align.getWindowLeft($selector));
        $selector.css("top", Align.getWindowTop($selector));
    };
    $.fn.extend({
        "align": function (way) {
            Align[way]($(this));
            return $(this)
        }
    })
})(jQuery);

var NovelScript = {};
var ns = NovelScript;
ns.novelScript = "hina";
ns.version = 0.1;
// all
ns.effect = {};
ns.dev = {};
ns.ui = {};

// constomization
ns.controls = {};
ns.default = {};

// init
ns.data = {};
ns.$frame = $("body");

/**
 * adopted from https://segmentfault.com/a/1190000000684923
 * preloader can pre-download images in caches, deferred
 * verified in Androrid chrome
 * @param list
 * @param imgs
 * @returns {$.Deferred.premise()}
 */
ns.preloadImage = function (list, imgs) {
    var def = $.Deferred(),
        len = list.length;
    $(list).each(function (i, e) {
        var img = new Image();
        img.src = e;
        if (img.complete) {
            imgs[list[i]] = $(img);
            len--;
            //console.log("ready");
            console.log((i + 1) + "/" + list.length);
            if (len == 0) {
                def.resolve();
            }
        }
        else {
            img.onload = (function (j) {
                return function () {
                    imgs[list[j]] = $(img);
                    len--;
                    //console.log("load");
                    console.log((j + 1) + "/" + list.length);
                    if (len == 0) {
                        def.resolve();
                    }
                };
            })(i);
            img.onerror = function () {
                len--;
                console.log('failed to load image');
            };
        }
    });
    return def.promise();
};

ns.preloadAudio = function (list, audios) {
    var def = $.Deferred();
    //TODO load audios
    def.resolve();
    return def.promise()
};

/**
 * closure proto typer
 * Giving a typing effext for text showings
 * detail in typerExemple.js
 * needing jquery 1.11
 */
ns.typer = (function () {
    var typer = {};

    typer.given = function ($selecter, text, f) {
        $selecter.append(text);
        f=f||function(){return 0};
        f()
    };

    typer.typing = function ($selecter, string, speed, f) {
        string = " "+string;
        speed = speed||100;
        f=f||function(){return 0};
        var aux = function ($selecter, list, f) {
            $selecter.append(list.shift()).delay(speed).queue(function () {
                if (list.length === 0) {
                    f()
                } else {
                    aux($selecter, list, f)
                }
                $(this).dequeue()
            });
        };
        aux($selecter, string.split(''), f)
    };

    typer.flush = function ($selecter, string, speed, f) {
        string = " "+string;
        speed = speed||10;
        f=f||function(){return 0};
        var aux = function ($selecter, list, f) {
            $selecter.append($("<span></span>").html(list.shift()).fadeIn(speed)).delay(speed).queue(function () {
                if (list.length === 0) {
                    f()
                } else {
                    aux($selecter, list, f)
                }
                $(this).dequeue()
            });
        };
        aux($selecter, string.split(''), f)

    };
    /*
    typer.wait = function ($selecter, time, f) {
        f=f||function(){return 0};
        $selecter.append("<span id='typewait' style='display:none'>_</span>");
        var aux = function(time,f){
            $("#typewait").show().delay(800).hide(300,function(){
                if(time === 1){
                    f()
                }else{
                    aux(time-1,f)
                }
                //$(this).dequeue()
            });
        };
        aux(time,f)
    };
    */
    return typer
})();

/**
 * closure proto store
 * which packs the localStorage and sessionStorage of HTML5
 * needing modern browser integrating localStorage, sessionStoage and JSON
 * also for those living in EU, this does not use cookie
 */

ns.store = (function() {
    var store = {};
    store.infolocal = {};
    if(!localStorage.nsStorageLocal) localStorage.nsStorageLocal = JSON.stringify(store.infolocal);
    else store.infolocal = JSON.parse(localStorage.nsStorageLocal);

    store.infosession = {};
    if(!sessionStorage.nsStorageSession) sessionStorage.nsStorageSession = JSON.stringify(store.infosession);
    else store.infosession = JSON.parse(sessionStorage.nsStorageSession);

    store.save = function () {
        localStorage.nsStorageLocal = JSON.stringify(store.infolocal);
        sessionStorage.nsStorageSession = JSON.stringify(store.infosession)
    };
    store.local = function (key, value) {
        if(value === undefined) return store.infolocal[key];
        store.infolocal[key] = value;
        store.save()
    };
    store.session = function (key, value) {
        if(value === undefined) return store.infosession[key];
        store.infosession[key] = value;
        store.save()
    };

    store.existLocal = function (key, value) {
        if(store.infolocal[key] === undefined){
            store.local(key, value);
            store.save()
        }
        return store.infolocal(key)
    };
    store.existSession = function (key, value) {
        if(store.infosession[key] === undefined){
            store.session(key, value);
            store.save()
        }
        return store.session(key)
    };

    store.clear = function (which) {
        which = which || "local";
        if(which == "local") store.infolocal = {};
        else store.infosession = {};
        store.save()
    };

    return store
})();

/**
 * init a novelscript example
 * @param data
 * @param $frame
 * @param setting
 */
ns.init = function (data, $frame, setting) {
    ns.$deferred = $.Deferred();
    if (!data) throw "failed to load script data.";
    ns.data = data;
    ns.$frame = $frame || $("body");
    // init data
    ns.dp = ns.initDp(ns.data); // data processor (which is closed though) should not not modify any data
    // import state
    ns.importState(ns.getStoredState());
    // init state if needed
    if (!ns.state.state.round) ns.initState();
    // form frame ui
    ns.ui.initTheme({
        width: ns.$frame.width(),
        height: ns.$frame.height()
    });
    ns.initControls(setting);
    ns.relation = ns.initRelation();
    ns.stage = ns.ui.frame();
    ns.stage.$main.appendTo(ns.$frame);
    ns.slides = ns.slide();
    ns.resource = ns.initResource(setting);
    // ns.start();

};

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

ns.default.setting = {
    theme: "hina"
};

ns.default.dialogueDisplay = ns.typer.flush;

/**
 * dp = data processor
 * @param data: Obj, scriptObject
 */
ns.initDp = function (data) {
    var dp = {};
    dp.get = function (script, position) {
        if(!position) return data[script];
        else return data[script][position]
    };
    dp.getFromState= function () {
        return dp.get(ns.state.state.script, ns.state.state.position)
    };
    /**
     * fix stack when jumpScript is called
     * @param script
     * @param position
     */
    dp.stackFix = function (script, position) {
        var stack = dp.get(script, position);
        if(position == 0) return stack;
        var isIncomplete = function (stack) {
            var lack = [];
            if(!stack.figure) lack.push("figure");
            else {
                for(var i = 0; i < stack.figure.length; i++){
                    if(stack.figure == "" || stack.figure == 0){
                        lack.push("cg");
                        break;
                    }
                }
            }
            if(!stack.cg) lack.push("cg");
            if(!stack.bg) lack.push("bg");
            if(!stack.bgm) lack.push("bgm");
            if(!lack.length) return false;
            else return lack;
        };
        var lack = isIncomplete(stack);
        if(!lack) return stack;
        var fix = function (which) {
            var pre;
            for(var i = position; i >= 0; i--){
                pre = dp.get(script, i)[which];
                if(pre[which] && pre[which] != 0){
                    stack[which] = pre[which]
                }
            }
        };
        var fixFigure = function () {
            var figure = [];
            for(var i = 0; i < position; i++){
                var thisFigure = dp.get(script, i).figure;
                if(thisFigure){
                    for(var j = 0; j < thisFigure.length; j++){
                        if(thisFigure[j] != ""){
                            figure[j] = thisFigure[j]
                        }
                    }
                }
            }
            stack.figure = figure;
        };
        // main fix
        for(var i = 0; i < lack.length; i++){
            if(lack[i] == "figure") fixFigure();
            else fix(lack[i])
        }
        return stack
    };

    dp.resourceCollector = function (data) {
        data = data || ns.data;
        var media = {};
        media.images = [];
        media.audios = [];
        // resource collector version front-end
        var keys = Object.keys(data);
        for(var key = 0; key < keys.length; key++){
            var script = data[Object.keys[data][key]];
            for(var i = 0; i < script.length; i++){
                // figure
                for(var figure = 0; figure < script[i].figure.length; figure++){
                    var f = script[i].figure[figure];
                    if(f && (!media.images.indexOf(f))) media.images.push(f)
                }
                // cg, bg, bgm
                var cg = script[i].cg;
                if(cg && (!media.images.indexOf(cg))) media.images.push(cg);
                var bg = script[i].bg;
                if(bg && (!media.images.indexOf(bg))) media.images.push(bg);
                var bgm = script[i].bgm;
                if(bgm && (!media.audios.indexOf(bgm))) media.audios.push(bgm);
            }
        }
        return media
    };

    dp.firstScript = function () {
        return data[Object.keys(data)[0]]
    };

    return dp
};

ns.dp = {};

ns.initResource = function (setting) {
    var resource = {};
    resource.images = {};
    resource.audios = {};
    resource.get = function (type, name) {
        //TODO 0.1 not yet preloader
        switch (type){
            case "figure":
                return $("<img />").attr("src", setting.path["figure"] + name);
            case "cg":
                return setting.path["cg"] + name;
            case "bg":
                return setting.path["bg"] + name;
            case "bgm":
                return $("<audio></audio>").attr("src", setting.path["bgm"] + name);
            default:
                throw "No specified type " + type
        }
    };
    return resource
};

ns.resource = {};
ns.resource.images = {};
ns.resource.audios = {};

ns.loadResource = function () {
    var def = $.Deferred();
    var images = ns.controls.images;
    var audios = ns.controls.audios;
    // load images
    $.when(ns.preloadImage(images, ns.resource.images))
        .done(function () {
            $.when(ns.preloadAudio(audios, ns.resource.audios))
                .done(function () {
                    def.resolve()
                })
                .fail(function () {
                    throw "Audio preloading failed."
                })
        })
        .fail(function () {
            throw "Images preloading failed"
        });
    return def.promise();
};

/**
 * TODO ns.start
 * start the galgame from script and position given
 * @param script
 * @param position
 */
ns.start = function (script, position) {
    var dp = ns.dp;
    var slide = ns.slide();
    script = script || dp.firstScript();
    position = position || 0;
    slide.move();
    slide.active();
};

/**
 * TODO so guess what i've done to find a next node in the script?
 * @returns {{}|*}
 */
ns.initRelation = function () {
    var relation = ns.controls.relation;
    // place defaut
    var scripts = Object.keys(ns.data);
    for(var i = 0; i < scripts - 1; i++){
        if(!Object.keys(relation).indexOf(scripts[i])){
            relation[scripts[i]] = {
                condition: true,
                child: scripts[i + 1]
            }
        }
    }
    // the last one
    relation[scripts[i]] = null;

    return relation
};

ns.relation = {};

ns.state = {};
/**
 * defines the way to get the state data from storage
 * which, for NovelScript-light, is from localStorage
 * @param option: Object, for future versions
 */
ns.getStoredState = function (option) {
    return ns.store.local("nsstate")
};

ns.storeState = function () {
    ns.store.local("nsstate", ns.state)
};

/**
 * import a object that contains information of
 * @param stat
 */
ns.importState = function (stat) {
    ns.state = ns.controls.statePassable(stat) || ns.default.state
};

ns.initState = function () {
    ns.state.state.round = 0;
    ns.state.state.script = Object.keys(ns.data)[0];
    ns.state.stack = ns.data[ns.state.state.script][0];
    ns.storeState();
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

ns.ui.initTheme = function (style) {
    ns.ui.themes.hina = {};
    (function (hina) {
        hina.mainstageStyle = {
            width: style.width,
            height: style.height,
            "background-color": "#f3f3f3",
            "background-size": style.width+"px "+style.height+"px",
            position: "relative"
        };
        hina.mainstageStyle["background-image"] = "url('tmp/e/koharu.jpg')";
        hina.figureStyle = {
            width: style.width,
            position: "absolute",
            bottom: 0,
            "text-align": "center"
        };
        hina.figureImageStyle = {
            height: 0.8 * style.height
        };
        hina.contentStyle = {
            width: style.width * 0.7,
            height: style.height / 4,
            position: "absolute",
            bottom: 0,
            "background-image": "url('tmp/e/sf.png')"
        };
        hina.dialogueStyle = {
            width: "inherit",
            height: "inherit",
            "background-color": "#87CEEB",
            "opacity": 0.4
        };
        var widthContent = hina.contentStyle.width;
        var heightContent = hina.contentStyle.height;
        hina.contentStyle.left = (style.width - widthContent) / 2;
        hina.dialogueStyle["border-radius"] = (widthContent/2) + "px/" + (heightContent/2) + "px";
        hina.speakerStyle = {
            "background-color": "#87CEEB",
            position: "absolute",
            left: 0,
            top: 0
        };
        hina.dialStyle = {
            "font-size": "150%",
            position: "absolute",
            left: widthContent / 8,
            top: heightContent / 5
        };

    })(ns.ui.themes.hina);
};

ns.ui.themes = {};


// change theme in ns.control.theme

ns.ui.frame = function () {
    var width = ns.$frame.width();
    var height = ns.$frame.height();
    // mainstage
    var stage = {};

    stage.$main = $("<div></div>")
        .css(ns.controls.theme.mainstageStyle);

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
        .html("武也")
        .appendTo(stage.$content);

    stage.$dial = $("<p></p>")
        .css(ns.controls.theme.dialStyle)
        .html("那样就更差劲了吧，<br>一辈子都不要忘了自己惹哭过的少女的模样啊！")
        .appendTo(stage.$content);

    return stage
};

ns.stage = {};

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
    /**
     * update the display of a slide
     */
    slide.repaint = function () {
        if(stack.speaker) slide.speaker();
        if(stack.bg) slide.bg();
        if(stack.cg) slide.cg();
        if(stack.figure && stack.figure.length) slide.figure();
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
        if(state.position < dp.get(state.script).length - 1){
            state.position++;
            var next = dp.get(state.script, state.position);
            // TODO terminal check
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
            if(next.figure) {
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
        else{

            var r = relation[state.script];
            if(r === null) ns.$deferred.resolve();
            else {
                for(var i = 0; i < r.length; i++){
                    if(r[i].condition){
                        slide.jumpScript(r[i]);
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
        if(stack.bg === 0 || stack.bg === "0") stage.$main.css("background-image", "none");
        else slide.changeBackgroundImage(resource.get("bg", stack.bg))
    };
    slide.cg = function () {
        if(stack.cg === 0 || stack.cg === "0"){
            slide.bg();
            stage.$figure.show();
        }
        else{
            stage.$figure.hide();
            slide.changeBackgroundImage(resource.get("cg", stack.cg))
        }
    };
    slide.figures = [];
    slide.figure = function () {
        slide.figures = [];
        stage.$figure.html("");
        for(var i = 0; i < stack.figure.length - 1; i++){
            slide.figures.push(resource.get("figure", stack.figure[i]));
            //.css("float", "left"))
        }
        slide.figures.push(resource.get("figure", stack.figure[i]));
        for(i = 0; i < slide.figures.length; i++){
            slide.figures[i].css(ns.controls.theme.figureImageStyle)
                .appendTo(stage.$figure)
        }
        //console.log(stack.figure);
    };

    var dial = stack.dialogue;

    /**
     * main: make a display to the screen
     */
    slide.move = function () {
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

    //slide.active();
    return slide
};

ns.slides = {};
