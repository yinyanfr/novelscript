/**
 * Created by Ian on 2015/5/31.
 * Github : https://github.com/yinyanfr/NovelScript
 * NovelScript.light.js is a part of the project NovelScript
 * The project NovelScript is open, you have the right to use, modify, republish, etc.
 */

// libs
//Align
var Align = {}; // Simple Package

Align.setPositionRelative = function (selector) {
    $(selector).css("position", "relative");
};

Align.setPositionAbsolute = function (selector) {
    $(selector).css("position", "absolute");
};

Align.getReletiveLeft = function (selector) {
    var parent = $(selector).parent();
    return (parent.width() - $(selector).width()) / 2;
};

Align.getWindowLeft = function (selector) {
    return ($(window).width() - $(selector).width()) / 2;
};

Align.getReletiveTop = function (selector) {
    var parent = $(selector).parent();
    return (parent.height() - $(selector).height()) / 2;
};

Align.getWindowTop = function (selector) {
    return ($(window).height() - $(selector).height()) / 2;
};

Align.horizontal = function (selector) {
    Align.setPositionRelative(selector);
    $(selector).css("left", Align.getReletiveLeft(selector));
};

Align.vertical = function (selector) {
    Align.setPositionRelative(selector);
    $(selector).css("top", Align.getReletiveTop(selector));
};

Align.full = function (selector) {  // Align horizontal and vertical against its parent element
    Align.setPositionRelative(selector);
    $(selector).css("left", Align.getReletiveLeft(selector));
    $(selector).css("top", Align.getReletiveTop(selector));
};

Align.fullscreen = function (selector) { // Align horizontal and vertical fullscreen when there's nothing else shown
    Align.setPositionAbsolute(selector);
    $(selector).css("left", Align.getWindowLeft(selector));
    $(selector).css("top", Align.getWindowTop(selector));
};

// preload
/**
 * Created by Joe
 * http://jr3.me/javascriptshi-xian-tu-pian-de-yu-jia-zai-gong-neng/
 * Adopted
 */

function preloadImgSimple(url,afterwards) {
    var img = new Image();
    img.src = url;
    if(img.complete) {
        afterwards();
    }
    else {
        img.onload = function() {
            afterwards();
        };
    }
}

function preloadImg(list,imgs) {
    var def = $.Deferred(),
        len = list.length;
    $(list).each(function(i,e) {
        var img = new Image();
        img.src = e;
        if(img.complete) {
            imgs[i] = img;
            len--;
            if(len == 0) {
                def.resolve();
            }
        }
        else {
            img.onload = (function(j) {
                return function() {
                    imgs[j] = img;
                    len--;
                    if(len == 0) {
                        def.resolve();
                    }
                };
            })(i);
            img.onerror = function() {
                len--;
                console.log('fail to load image');
            };
        }
    });
    return def.promise();
}


function preloadImgMain(list,imgs,afterwards) {
    $.when(preloadImg(list, imgs)).done(
        function () {
            afterwards();
        }
    );
}

// typer
var typer = {};

typer.given = function (selector, text, f) {
    $(selector).append(text);
    f=f||function(){return 0};
    f()
};

typer.typing = function (selector, string, speed, f) {
    string = " "+string;
    speed = speed||100;
    f=f||function(){return 0};
    var aux = function (selector, list, f) {
        $(selector).append(list.shift()).delay(speed).queue(function () {
            if (list.length === 0) {
                f()
            } else {
                aux(selector, list, f)
            }
            $(this).dequeue()
        });
    };
    aux(selector, string.split(''), f)
};

typer.flush = function (selector, string, speed, f) {
    string = " "+string;
    speed = speed||10;
    f=f||function(){return 0};
    var aux = function (selector, list, f) {
        $(selector).append($("<span></span>").html(list.shift()).fadeIn(speed)).delay(speed).queue(function () {
            if (list.length === 0) {
                f()
            } else {
                aux(selector, list, f)
            }
            $(this).dequeue()
        });
    };
    aux(selector, string.split(''), f)

};

typer.wait = function (selector, time, f) {
    f=f||function(){return 0};
    $(selector).append("<span id='typewait' style='display:none'>_</span>");
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

// plugins
var diapo = function(list,stage,bgColor,time){
    var diapo = {};
    diapo.selector = stage;
    diapo.list = list;
    diapo.stage = "#diapostage";
    diapo.time = time||1500;
    diapo.parent = $(stage);
    diapo.bgColorCache = diapo.parent.css("background-color");
    diapo.init = function(){
        $(stage).html("<div id='diapostage'></div>");
        //alert($(stage).html());
        diapo.parent.css("background-color",bgColor);
        Align.full(diapo.stage);
        $(diapo.stage).hide();
        return this;
    };
    diapo.recover = function(afterwards){
        diapo.parent.css("background-color",diapo.bgColorCache);
        afterwards();
    };
    diapo.toHtml = function(n) {
        if (n.slice(-3) == "jpg" || n.slice(-3) == "png") {
            return "<img src=" + n + " />"
        }
        else {
            return n;
        }
    };
    diapo.anime = function(afterwards){
        time = diapo.time;
        if(diapo.list.length === 0){
            diapo.recover(afterwards);
        }
        else{
            var tmp = diapo.list.shift();
            $(diapo.stage).html(diapo.toHtml(tmp));
            //alert($(diapo.stage).html())
            var tmpWidth = $(diapo.stage).width();
            Align.full(diapo.stage);
            $(diapo.stage).width(tmpWidth);
            $(diapo.stage).fadeIn(time, function () {
                //TODO bug of width fixed but should it be in align.js?

                $(diapo.stage).fadeOut(time,function(){
                    diapo.anime(afterwards);
                });
            });
        }
        return this;
    };
    diapo.execute = function(afterwards){
        diapo.init().anime(afterwards);
    };
    return diapo;
};

//don
(function(){
    var times = 1;
    var getWindowLeft = function (selector) {
        return ($(window).width() - $(selector).width()) / 2;
    };
    var getWindowTop = function (selector) {
        return ($(window).height() - $(selector).height()) / 2;
    };
    don = function(text,type,yes,no){
        var id = "don"+times;
        var pid = "#"+"don"+(times-1);
        var sid = "#"+id;
        if(times === 1) {
            $("body").append('<div class="don" id="' + id + '">' + text + '</div>');
        }else{
            $(pid).before('<div class="don" id="' + id + '">' + text + '</div>');
        }
        console.log(text);
        $(".don").width(300)
            .height(200)
            .css("border","1px solid gray")
            .css("background-color","#f3f3f3")
            .css("position","fixed")
            .css("top",getWindowTop(".don"))
            .css("left",getWindowLeft(".don"));
        if(!type) {
            $(sid).append('<button type="button" id="donok">'+'ok'+'</button>');
            $("#donok").click(function () {
                $(sid).hide();
            });
            times++;
            return true;
        } else if(type == "verify"){
            $(sid).append('<button type="button" id="donyes">'+'是'+'</button>');
            if(no) {
                $(sid).append('<button type="button" id="donno">' + '否' + '</button>');
            }
            times++;
            $("#donyes").click(function(){
                $(sid).hide(0,yes);
            });
            if(no) {
                $("#donno").click(function () {
                    $(sid).hide(0,no);
                });
            }
        } else if(type == "input"){
            $(sid).append('<input type="text" id="dontext" value="" />');
            $(sid).append('<input type="submit" id="donsub" value="ok" />');
            times++;
            var res = "";
            $("#donsub").click(function(){
                $(sid).hide(0,function(){
                    yes($("#dontext").val());
                });
            });
        }
    };
})();

// videoStream
var videoStream = function(selector, video){
    var vs = {};
    vs.execute = function(f){
        $(selector).html("<video width='"+$(selector).width()+"' height='" + $(selector).height() + "'><source src='"+video+"' type='video/mp4' /></video>");
        $(selector).click(function(){
            f()
        })
    };
    return vs;
};

// effectGroup
var effectGroup = function (async, group) {
    /*
     * effectGroup 用来执行一个效果队列 i
     * 参数 async in boolean 是否异步执行
     *     group in [] of {} 效果队列
     * 注意：不是所有的effect都能同步执行
     */
    var eg = {};
    eg.group = group; // 储存group，防止修改外部变量
    eg.executionAsync = function(f){
        // 异步执行的情况 io rec
        if(eg.group.length === 0){
            f(); // callback
        }else{
            eg.group.shift().execute(function () {
                eg.executionAsync(f)
            });
        }
    };
    eg.executionSync = function(f){
        // 同步执行的情况 i
        for(var i = 0; i < eg.group.length; i++){
            eg.group[i].execute(function(){
                return 0
            })
        }
        f()
    };
    eg.execute = function(f){
        if(async){
            eg.executionAsync(f)
        }else{
            eg.executionSync(f)
        }
    };
    return eg;
};

// common
/**
 * Created by Ian on 2015/5/18.
 */

var settingList = {
    fgRep : "gal/",
    cgRep : "cg/",
    bgRep : "bg/",
    bgmRep : "bgm/"
};

var NovelScript = function (selector, script, setting) {
    /* function io clojure
     * selector : where NovelScript takes place
     * script : object script
     * setting : settngList
     */
    // semi-global
    var topParent = $(selector).css("top");
    var leftParent = $(selector).css("left");
    var bottomParent = $(selector).css("bottom");
    var rightParent = $(selector).css("right");
    topParent = (topParent == "auto")? 0 : parseInt(topParent);
    leftParent = (leftParent == "auto")? 0 : parseInt(leftParent);
    bottomParent = (bottomParent == "auto")? 0 : parseInt(bottomParent);
    rightParent = (rightParent == "auto")? 0 : parseInt(rightParent);

    var ns = {};
    ns.initiate = function () { // function io
        $(selector).html(function () {
            var res = "";
            for (var i = 0; i < ns.fgList.length; i++) {
                res += "<img class='nsimg' id='nsimg" + i + "' src='" + setting.fgRep + "test1.png' style='position:relative;bottom:0;left:" + ns.fgList[i] + ";display:none' />"
            }
            res += "<div id='nsscope'>";
            res += "<div id='nsspeak'></div><div id='nsdialogue'></div></div>";
            res += "<audio><source></audio>";
            return res;
        });
        // css

        $("#nsspeak").css("padding","10px")
            .css("font-size","200%")
            .css("font-family","SimHei");

        $("#nsdialogue").css("padding","10px")
            .css("font-size","150%")
            .css("font-family","华文细黑, Microsoft Yahei, Arial");

        $("#nsscope").css("border","1px solid gray")
            .css("height",200)
            .css("position","relative")
            .css("top",0.96*($(selector).height() - $("#nsscope").height()))
            .css("z-index",3)
            .css("padding","20px")
            .css("padding-bottom",0)
            .css("background-color","#f3f3f3")
            .css("opacity",0.8);

        $(selector).css("background-attachmemt","fixed")
            .css("background-size","100%"); // bg， cg 拉伸或适应屏幕

        var cgGapWidth = $(selector).width() / 6;

        for(var i = 0; i < 5; i++){
            var idimg = "#nsimg"+i;
            $(idimg).css("position","absolute")
                //.css("top",0.96*($(selector).height() - $(idimg).height()))
                .css("left", 0.9*cgGapWidth*i);
        }

        //alert($("#nsscope").height())
        // alert($("#nsscope").css("top"))
    };

    ns.htmlInstantCache = "";
    ns.htmlCache = false;
    $(selector).bind("DOMSubtreeModified",function(){
        ns.htmlInstantCache = $(selector).html();
    });
    ns.selection = $(selector);
    ns.getStage = selector;
    ns.fgList = [0, 0, 0, 0, 0];
    ns.scripts = Object.keys(script); // keys of script
    ns.idScript = 0; // ns.scripts[ns.idScript] => one script
    ns.currentSliceNumber = 0;
    ns.current = {};
    ns.jumpScript = function(script, slice){ // 剧本定位跳跃
        // script 是一个数字
        ns.idScript = script;
        ns.currentSliceNumber = slice
    };
    ns.slice = function () { // function io rec
        function aux() {
            var current = (function(){
                // 通过 ns.idScript 和 ns.currentSliceNumber 来确认当前的slice， 不修改script参数
                var currentScript = script[ns.scripts[ns.idScript]];
                var currentSlice = currentScript[ns.currentSliceNumber];
                if (ns.idScript === (ns.scripts.length - 1)) { // the last script
                    if (ns.currentSliceNumber == currentScript.length) { // the end of the tale
                        //ns.currentSliceNumber = 0;
                        return null
                    } else {
                        ns.currentSliceNumber++;
                        return currentSlice;
                    }
                } else {
                    if (ns.currentSliceNumber == (currentScript.length - 1)) { // end of this script
                        ns.idScript++;
                        ns.currentSliceNumber = 0;
                        return currentSlice;
                    } else {
                        ns.currentSliceNumber++;
                        return currentSlice;
                    }
                }
            })();
            ns.current = current;
            ns.currentBg = "none";
            ns.figureHeight = (function(){
                return 700
            })();  //TODO
            if (current != null) {
                if ((current["condition"] === undefined)||(current["condition"] === true)) { // condition
                    //TODO 递归连三月，堆栈抵万金
                    // typer + effect + merge 连环递归
                    // 论如何写出无法维护的代码
                    var slicing = function(){
                        if(ns.htmlCache != false){
                            //alert(ns.htmlCache)
                            $(selector).html(ns.htmlCache);
                            ns.htmlCache = false;
                        }
                        ns.selection.bind("click",aux); // 效果执行完毕，恢复点击换页
                        $("#nsspeak").html(current["speaker"]); // speaker
                        $("#nsdialogue").html('');
                        for (var i = 0; i < current["figure"].length; i++) {
                            if (current["figure"][i] === false) { // figure
                                $("#nsimg" + i).hide();
                            } else if (current["figure"][i] !== true) {
                                $("#nsimg" + i).attr("src", setting.fgRep + current["figure"][i])
                                    .show().height(ns.figureHeight)
                                    .css("top", 0.96*($(selector).height() - $("#nsimg" + i).height()))
                                    //.css("bottom",bottomParent)
                                    //.css("right",rightParent)
                                    .css("z-index",2);
                            }
                        }
                        if(current["bg"] === false){ // bg
                            $(selector).css("background-image","none")
                        }else if(current["bg"] !== true){
                            $(selector).css("background-image","url("+ setting.bgRep + current["bg"] +")");
                            ns.currentBg = setting.bgRep + current["bg"]
                        }
                        if(current["cg"] === false){ // cg
                            $(selector).css("background-image",ns.currentBg)
                        }else if(current !== true){
                            $(selector).css("background-image","url("+ setting.cgRep + current["cg"] +")")
                        }
                        if(current["bgm"] === false){ // bgm

                        }
                        var dialogue = current["dialogue"]; // dialogue
                        ns.selection.unbind('click', aux).bind('click', function () {
                            aux2(dialogue)
                        });
                        typer.flush("#nsdialogue", dialogue, 10, function () {
                            ns.selection.unbind("click").bind("click", aux);
                        });
                        if(ns.current["after"]){
                            ns.current["after"]()
                        }
                    };
                    function effect(){
                        if(current["effect"]){ // effect
                            ns.htmlCache = ns.htmlInstantCache;
                            ns.selection.unbind('click'); // 中断点击换页，等待效果完成
                            current["effect"].execute(slicing)
                        }else{
                            slicing()
                        }
                    }
                    if(current["merge"]){ // merge
                        $(selector).unbind("click",aux); // 暂停翻页
                        var mergeList = current["merge"]; // 储存merge列表
                        function merge(i){
                            // function io rec clojure
                            if(i == mergeList.length){
                                return 0
                            } else {
                                if(mergeList[i].condition) {
                                    $(selector).append("<button class='mergebutton' id='mergeid" + i + "' type='button'>" + mergeList[i].text + "</button><br/>");
                                    $("#mergeid"+i).click(function(){
                                        mergeList[i].action();
                                        $(".mergebutton").hide();
                                        $(".mergegray").hide();
                                        aux()
                                    })
                                } else if(mergeList[i].gray) {
                                    $(selector).append("<button class='mergegray' id='mergeid" + i + "' type='button'>" + mergeList[i].text + "</button>");
                                }
                                merge(i+1)
                            }
                        }
                        merge(0);
                        // css
                        $(".mergebutton").css({
                            "position" : "relative",
                            "z-index" : 4,
                            "margin-left" : "auto",
                            "margin-right" : "auto",
                            "width" : "300px",
                            "height" : "80px",
                            "font-size" : "150%",
                            "margin-bottom" : "50px",
                            "display" : "block",
                            "border" : "1px solid gray",
                            "background-color" : "#f3f3f3"
                        });
                        $(".mergegray").css({
                            "position" : "relative",
                            "z-index" : 4,
                            "margin-left" : "auto",
                            "margin-right" : "auto",
                            "width" : "300px",
                            "height" : "80px",
                            "font-size" : "150%",
                            "margin-bottom" : "50px",
                            "display" : "block",
                            "border" : "1px solid gray",
                            "background-color" : "gray"
                        });

                    }else{
                        effect()
                    }
                } else {
                    aux();
                }
            } else {
                ns.recover();
            }
        }

        function aux2(n) {
            $("#nsdialogue").finish().html(n);
            if(ns.current["after"]){
                ns.current["after"]()
            }
            ns.selection.unbind("click").bind("click", aux);
        }

        ns.selection.bind('click', aux);
    };
    ns.recover = function () {
        alert("done");
    };
    ns.initiate();
    ns.slice();
    return ns;
};