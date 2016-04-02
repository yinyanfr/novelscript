/**
 * Created by Ian on 2016/4/2.
 */

/**
 * TODO ns.start
 * start the galgame from script and position given
 * @param script
 * @param position
 * @returns $.Deferred.promise()
 */
ns.start = function (script, position) {
    var dp = ns.dp;
    script = script || dp.firstScript();
    position = position || 0;
    var def = $.Deferred();
    
    return def.promise()
};