/**
 * Created by Ian on 2015/3/28.
 */

var shell = new Object();

var welcome = "A simple shell of JavaScript.";

var loader = (function () {
    var res = "";
    $("script").each(function () {
        res += $(this).attr("src");
        res += "<br />"
    });
    return res;
})();

var whole = "";

shell.stage = "#shell";

shell.initiate = function () {
    whole += welcome + "<br />" + loader + "<br />";
    return this;
};

shell.print = function (n,end) {
    whole += String(n) + String(end);
    return this;
};

function print(n){
    shell.print(n,"<br />");
}


//Main
$(document).ready(function () {
    shell.initiate();
    main();
    $(shell.stage).html(whole);


});

