/**
 * Created by Ian on 2015/5/18.
 */

var NovelScript = function (selector, script) {
    var ns = {};
    ns.initiate = function(){
      $(selector).html("<div id='nsscope'><div id='nsspeak'></div><div id='nsdialogue'></div></div>")
    };
    ns.scripts = Object.keys(script);
    ns.idScript = 0;
    ns.slice = function(){
        function aux(){
            var current = (function(){
                var currentScript = script[ns.scripts[ns.idScript]];
                if(ns.idScript === (ns.scripts.length - 1)){ // the last piece
                    if(currentScript.length === 0){
                        return null
                    }else{
                        return script[ns.scripts[ns.idScript]].shift();
                    }
                }else{
                    if(currentScript.length === 0){
                        ns.idScript++;
                        return script[ns.scripts[ns.idScript]].shift();
                    }else{
                        return script[ns.scripts[ns.idScript]].shift();
                    }
                }
            })();
            if(current != null) {
                $("#nsspeak").html(current["speaker"]);
                $("#nsdialogue").html('');
                var dialogue = current["dialogue"];
                $(window).unbind('click', aux).bind('click', function () {
                    aux(dialogue)
                });
                typer.flush("#nsdialogue", dialogue, 10, function () {
                    $(window).unbind("click").bind("click", aux);
                })
            }else{
                ns.recover();
            }
        }
        function aux2(n){
            $("#nsdialogue").finish().html(n);
            $(window).unbind("click").bind("click",aux);
        }

        $(window).bind('click',aux);
    };
    ns.recover = function(){
        alert("done");
    };
    ns.initiate();
    ns.slice();
    return ns;
};