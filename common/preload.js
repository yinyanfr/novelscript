/**
 * Created by yan on 16/4/28.
 */

/**
 * repack from preloadjs of createjs
 * @param list
 * @param path
 * @param each
 * @param callback
 * @returns {*}
 */
ns.preload = function (list, path, each, callback) {
    path = path || "";
    var def = $.Deferred();
    var queue = new createjs.LoadQueue();
    queue.on("fileload", function () {
        if(each){
            each()
        }
    });
    queue.on("complete", function () {
        def.resolve();
        if(callback){
            callback()
        }
    });
    for(var i = 0; i < list.length; i++){
        queue.loadFile(path + list[i])
    }

    return def.promise()
};