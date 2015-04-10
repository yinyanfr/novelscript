/**
 * Created by Ian on 2015/4/10.
 */

function Welcome(list, stage, afterwards, fontColor, bgColor) {
    this.list = list;
    this.stage = stage;
    this.afterwards = afterwards;
    //(fontColor) || (fontColor = "black");
    this.fontColor = fontColor;
    //(bgColor) || (bgColor = "#F3F3F3");
    this.bgColor = bgColor;
    this.cacheBgColor = $("body").css("background-color");
}

Welcome.prototype.bgColorCache = function () {
    this.cacheBgColor = $("body").css("background-color");
};

Welcome.prototype.init = function () {
    this.bgColorCache();
    var self = this;
    $(this.stage).css("display","none")
        //.css("margin","0 auto")
        .css("position", "absolute")
        .css("top", "40%")
        .css("left", "40%")
        .css("bottom","40%")
        .css("right","40%")
        .css("color", this.fontColor);
    $("body").css("background-color", this.bgColor);
};
Welcome.prototype.recover = function () {
    $("body").css("background-color", this.cacheBgColor);
    this.afterwards();
};
Welcome.prototype.toHtml = function(n){
  if(n.slice(-3) == "jpg" || n.slice(-3) == "png"){
      return "<img src="+n+" />"
  }
  else{
      return n;
  }
};
Welcome.prototype.anime = function (l) {
    if(l.length === 0){
        this.recover();
    }
    else{
        var tmp = l.shift();
        var self = this;
        $(this.stage).html(this.toHtml(tmp));
        $(this.stage).fadeIn(1500, function () {
            $(self.stage).fadeOut(1500,function(){
                self.anime(l);
            });
        });
    }
};
Welcome.prototype.main = function(){
    this.init();
    this.anime(this.list);
};

/* demo
* var SponsorList = [];

 SponsorList[0] = "Novel Script";
 SponsorList[1] = "这是一个基于javascript的";
 SponsorList[2] = "lib/lx1.png";

 var apres = function(){
 alert("end of demo");
 };

 var diapo = new Welcome(SponsorList,"#welcome",apres,"black","#F3F3F3");

 $(document).ready(function(){
 diapo.main();
 });
*
* */