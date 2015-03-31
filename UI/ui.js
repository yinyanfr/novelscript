/**
 * Created by Ian on 2015/3/31.
 */
// Global
var UniverseWindowWidth = 800;

var SponsorList = [];

SponsorList[0] = "这是一个名字";
SponsorList[1] = "这是另一名字";


// Methods
function portrait(){
    return (($(window).width() < UniverseWindowWidth) || ($(window).width < $(window).height()))
}

function middleLine(target){
    var targetWidth = (function(){
        if(target.constructor == String){
            if(target.slice(-3) == "jpg" || target.slice(-3) == "png"){
                $("#sponsor").html("<img src="+target+" />");
                return $("#sponsor").width() + "px";
            }
            else {
                $("#sponsor").html(target);
                return target.length + "em";
            }
        }
    })();
    $("#sponsor").css("margin-left","auto")
        .css("margin-right","auto")
        .css("width",targetWidth)
        .css("margin-top",function(){
       return 0.45 * $(window).height() + "px";
    });
}

function welcome(l){
    if(l.length == 0) return;
    else{
        var tmp = l.shift();
        middleLine(tmp);
        $("#sponsor").fadeIn(1500,function(){
            $("#sponsor").fadeOut(1500,welcome(l));
        });
    }

}

$(document).ready(function(){
    welcome(SponsorList);
});
