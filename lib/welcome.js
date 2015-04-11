/**
 * Created by Ian on 2015/4/10 as a part of NovelScript
 *
 * This class Welcome defines a stream of texts or pictures showing with effects of fading in/out, full-screen and center-aligned.
 * jQuery 1.11 is required, this class is tested in jQuery 1.11.2
 * This class does not work with old-styled browsers as well as IE9.
 */

// import common, align;

function Welcome(list, stage, bgColor) { // function : class
    this.list = list;  // Array : list of text or pics
    this.stage = stage;  // String : parent container, in syntax of jQuery selector
    this.bgColor = bgColor;  // String : background color temporarily to change during the stream show
    this.cacheBgColor = $("body").css("background-color");
    // this.afterwards;  // callback function to define
}

Welcome.prototype.bgColorCache = function () {  // function in out : to store present background color before the stream
    this.cacheBgColor = $("body").css("background-color");
};

Welcome.prototype.init = function () { // function in out : initialising web style
    this.bgColorCache();
    var self = this;
    fullAlign(this.stage); // horizontal and vertical central-align with class align
    $(this.stage).hide();
    $("body").css("background-color", this.bgColor);
};
Welcome.prototype.recover = function () {  // function in out : restore and execute
    $("body").css("background-color", this.cacheBgColor);
    this.afterwards(); // callback
};

Welcome.prototype.anime = function (l) { // function in out rec : animation!
    if(l.length === 0){
        this.recover();
    }
    else{
        var tmp = l.shift();
        var self = this;
        $(this.stage).html(toHtml(tmp));
        fullAlign(this.stage);
        $(this.stage).fadeIn(1500, function () {
            $(self.stage).fadeOut(1500,function(){
                self.anime(l);
            });
        });
    }
};
Welcome.prototype.main = function(afterwards){
    this.afterwards = afterwards;
    this.init();
    this.anime(this.list);
};



/* demo
 var diapo = new Welcome(SponsorList,"#welcome","#F3F3F3");

 $(document).ready(function(){
    diapo.main(function(){
         alert("doSomething");
    });
 });
*/