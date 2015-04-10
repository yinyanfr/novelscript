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
    preloadImgSimple(SponsorList[2], function () {
        diapo.main(function () {
            alert("end of demo");
        });
    });
});