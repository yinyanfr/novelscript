/**
 * Created by Ian on 2015/5/4.
 */

var Align = {}; // Simple Package

Align.setPositionRelative = function (selector) {
    $(selector).css("position", "relative");
};

Align.setPositionAbsolute = function (selector) {
    $(selector).css("position", "absolute");
};

Align.getReletiveLeft = function (selector) {
    var parent = $(selector).parent();
    return (parent.width() - $(selector).width()) / 2;
};

Align.getWindowLeft = function (selector) {
    return ($(window).width() - $(selector).width()) / 2;
};

Align.getReletiveTop = function (selector) {
    var parent = $(selector).parent();
    return (parent.height() - $(selector).height()) / 2;
};

Align.getWindowTop = function (selector) {
    return ($(window).height() - $(selector).height()) / 2;
};

Align.horizontal = function (selector) {
    Align.setPositionRelative(selector);
    $(selector).css("left", Align.getReletiveLeft(selector));
};

Align.vertical = function (selector) {
    Align.setPositionRelative(selector);
    $(selector).css("top", Align.getReletiveTop(selector));
};

Align.full = function (selector) {  // Align horizontal and vertical against its parent element
    Align.setPositionRelative(selector);
    $(selector).css("left", Align.getReletiveLeft(selector));
    $(selector).css("top", Align.getReletiveTop(selector));
};

Align.fullscreen = function (selector) { // Align horizontal and vertical fullscreen when there's nothing else shown
    Align.setPositionAbsolute(selector);
    $(selector).css("left", Align.getWindowLeft(selector));
    $(selector).css("top", Align.getWindowTop(selector));
};
