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
    ns.fgList = [0, 0, 0, 0, 0];
    ns.scripts = Object.keys(script);
    ns.idScript = 0;
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
                if (current["condition"]) {
                    $("#nsspeak").html(current["speaker"]);
                    $("#nsdialogue").html('');
                    for (var i = 0; i < current["figure"].length; i++) {
                        if (current["figure"][i] === false) {
                            $("#nsimg" + i).hide();
                        } else if (current["figure"][i] !== true) {
                            $("#nsimg" + i).attr("src", setting.dataRep + current["figure"][i])
                                .show().height(300);
                            alert($(selector).height());
                        }
                    }
                    var dialogue = current["dialogue"];
                    $(window).unbind('click', aux).bind('click', function () {
                        aux2(dialogue)
                    });
                    typer.flush("#nsdialogue", dialogue, 10, function () {
                        $(window).unbind("click").bind("click", aux);
                    })
                } else {
                    aux();
                }
            } else {
                ns.recover();
            }
        }

        function aux2(n) {
            $("#nsdialogue").finish().html(n);
            $(window).unbind("click").bind("click", aux);
        }

        $(window).bind('click', aux);
    };
    ns.recover = function () {
        alert("done");
    };
    ns.initiate();
    ns.slice();
    return ns;
};