/**
 * Created by Ian on 2015/5/18.
 */

var NovelScript = function (selector, script, setting) {
    var ns = {};
    ns.initiate = function () {
        $(selector).html(function () {
            var res = "";
            res += "<div id='nsscope'>";
            for (var i = 0; i < ns.fgList.length; i++) {
                res += "<img class='nsimg' id='nsimg" + i + "' src='" + setting.dataRep + "test1.png' style='position:relative;bottom:0;left:" + ns.fgList[i] + ";display:none' />"
            }
            res += "<div id='nsspeak'></div><div id='nsdialogue'></div></div>";
            return res;
        });
    };
    ns.parent = $(selector).parent();
    ns.getStage = selector;
    ns.fgList = [0, 0, 0, 0, 0];
    ns.scripts = Object.keys(script);
    ns.idScript = 0;
    ns.jumpScript = function(n){
        for(var i = 0; i < ns.scripts.length; i++){
            if(ns.scripts[i] === n){
                return i
            }
        }throw "NullPointerException";
    };
    ns.slice = function () {
        function aux() {
            var current = (function () {
                var currentScript = script[ns.scripts[ns.idScript]];
                if (ns.idScript === (ns.scripts.length - 1)) { // the last piece
                    if (currentScript.length === 0) {
                        return null
                    } else {
                        return script[ns.scripts[ns.idScript]].shift();
                    }
                } else {
                    if (currentScript.length === 0) {
                        ns.idScript++;
                        return script[ns.scripts[ns.idScript]].shift();
                    } else {
                        return script[ns.scripts[ns.idScript]].shift();
                    }
                }
            })();
            if (current != null) {
                if (current["condition"]) { // condition
                    var slicing = function(){
                        ns.parent.bind("click",aux); // 效果执行完毕，恢复点击换页
                        $("#nsspeak").html(current["speaker"]); // speaker
                        $("#nsdialogue").html('');
                        for (var i = 0; i < current["figure"].length; i++) {
                            if (current["figure"][i] === false) { // figure
                                $("#nsimg" + i).hide();
                            } else if (current["figure"][i] !== true) {
                                $("#nsimg" + i).attr("src", setting.dataRep + current["figure"][i])
                                    .show().height(300);
                            }
                        }
                        var dialogue = current["dialogue"]; // dialogue
                        ns.parent.unbind('click', aux).bind('click', function () {
                            aux2(dialogue)
                        });
                        typer.flush("#nsdialogue", dialogue, 10, function () {
                            ns.parent.unbind("click").bind("click", aux);
                        })
                    };
                    if(current["effect"] != false){ // effect
                        ns.parent.unbind('click'); // 中断点击换页，等待效果完成
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
            ns.parent.unbind("click").bind("click", aux);
        }

        ns.parent.bind('click', aux);
    };
    ns.recover = function () {
        alert("done");
    };
    ns.initiate();
    ns.slice();
    return ns;
};