/**
 * Created by Ian on 2015/4/10.
 */

function horizonAlign(selector){
    $(selector).width($(selector).parent().width())
        .css("text-align","center"); // 有效
    alert($(selector).width()); // 无效
    $(selector).find("img").css("width",$(window).width()); //有效
}

function relativeTop(selector){
    var parent = $(window).height();
    return (parent - $(selector).height())/parent*50 + "%";
}

function verticalAlign(selector){
    $(selector).css("position","absolute")
        .css("top",relativeTop(selector));
}

function fullAlign(selector){ // rec
    horizonAlign(selector);
    verticalAlign(selector);
}
