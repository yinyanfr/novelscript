/**
 * Created by Ian on 2016/4/2.
 */

/**
 * TODO ns.start
 * start the galgame from script and position given
 * @param script
 * @param position
 */
ns.start = function (script, position) {
    var dp = ns.dp;
    var slide = ns.slide();
    script = script || dp.firstScript();
    position = position || 0;
    slide.move();
    slide.active();
};