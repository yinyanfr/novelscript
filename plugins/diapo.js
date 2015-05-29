/**
 * Created by Ian on 2015/5/15.
 * require jQuery 1.11.2, align.js
 * effect plugin diapo for NovelScript 1.0
 * creating a serveral slice of diapo in a vacant element aginst its parent element
 */

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

/*
 var l = ["hgah","dfsgsfdghsf","dgfsdf"];

 var welcome = diapo(l,"#b","gray");

 $(document).ready(function () {
 welcome.execute(1500,function(){return 0});
 });
 */