/**
 * Created by Ian on 2015/4/10.
 */

function horizonAlign(selector){
    var pa = $(selector).parent();
    var parent = pa.width();
    var minus = parent - $(selector).width();
    var relativeLeft = (minus) / parent * 50 + "%";
    $(selector).width(Math.min(pa.width(),pa.height()))
        .css("text-align","center")
        .css("position","relative")
        .css("left",relativeLeft);
    $(selector).find("img").css("width",$(selector).width());
}

function relativeTop(selector){
    var pa = $(selector).parent();
    var parent = pa.height();
    var minus = parent - $(selector).height();
    return (minus) / parent * 45 + "%";
}

function verticalAlign(selector) {
    $(selector).css("position", "relative")
        .css("top", relativeTop(selector));
}

function fullAlign(selector){
    horizonAlign(selector);
    verticalAlign(selector);
}
