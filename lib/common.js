/**
 * Created by Ian on 2015/5/18.
 */

var settingList = {
    fgRep : "gal/",
    cgRep : "cg/",
    bgRep : "bg/"
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
                        ns.currentSliceNumber = 0;
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
            console.log(current);
            if (current != null) {
                if ((current["condition"] === undefined)||(current["condition"] === true)) { // condition
                    // typer + effect 连环递归
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
                        if(current["cg"] === false){ // merge
                            $(selector).css("background-image",ns.currentBg)
                        }else if(current !== true){
                            $(selector).css("background-image","url("+ setting.cgRep + current["cg"] +")")
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
                    if(current["effect"]){ // effect
                        ns.htmlCache = ns.htmlInstantCache;
                        ns.selection.unbind('click'); // 中断点击换页，等待效果完成
                        current["effect"].execute(slicing)
                    }else{
                        slicing()
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