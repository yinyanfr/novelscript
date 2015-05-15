/**
 * Created by Ian on 2015/5/15.
 * require jQuery 1.11.2, align.js
 * effect plugin diapo for NovelScript 1.0
 * creating a serveral slice of diapo in a vacant element aginst its parent element
 */

var diapo = function(list,stage,bgColor){
    var diapo = {};
    diapo.list = list;
    diapo.stage = stage;
    diapo.parent = $(stage).parent();
    diapo.bgColorCache = diapo.parent.css("background-color");
    diapo.init = function(){
        diapo.parent.css("background-color",bgColor);
        Align.full(stage);
        $(stage).hide();
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
    diapo.anime = function(time){
        time = time||1500;
        if(diapo.list.length === 0){
            diapo.recover();
        }
        else{
            var tmp = diapo.list.shift();
            $(diapo.stage).html(diapo.toHtml(tmp));
            var tmpWidth = $(diapo.stage).width();
            Align.full(diapo.stage);
            $(diapo.stage).fadeIn(time, function () {
                //TODO bug of width
                $(diapo.stage).fadeOut(time,function(){
                    diapo.anime(time);
                });
            });
        }
        return this;
    };
    diapo.execute = function(time,afterwards){
        diapo.init().anime(time).recover(afterwards);
    };
    return diapo;
};

/*
 var l = ["hgah","dfsgsfdghsf","dgfsdf"];

 var welcome = diapo(l,"#b","gray");

 $(document).ready(function () {
 welcome.execute(1500,function(){return 0});
 });
 */