/**
 * Created by Ian on 2015/4/10.
 */

var SponsorList = [];

SponsorList[0] = "Novel Script";
SponsorList[1] = "这是一个基于javascript的";
SponsorList[2] = "lib/lx1.png";

var apres = function () {
    alert("end of demo");
};

var diapo = new Welcome(SponsorList, "#welcome", "#F3F3F3");

$(document).ready(function () {
    if(portrait()){
        alert("您的浏览器宽度过小或或处于竖屏状态，请更改为横屏或放大浏览器窗口，以获得更好的效果。")
    }
    preloadImgSimple(SponsorList[2], function () {
        diapo.main(function () {
            alert("end of demo");
        });
    });
});