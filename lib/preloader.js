/**
 * Created by Ian on 2016/2/28.
 */

/**
 * adopted from https://segmentfault.com/a/1190000000684923
 * preloader can pre-download images in caches, deferred
 * verified in Androrid chrome
 * @param list
 * @param imgs
 * @returns {$.Deferred.premise()}
 */
ns.preloader = function (list, imgs) {
    var def = $.Deferred(),
        len = list.length;
    $(list).each(function (i, e) {
        var img = new Image();
        img.src = e;
        if (img.complete) {
            imgs[i] = img;
            len--;
            console.log("ready");
            console.log((i + 1) + "/" + list.length);
            if (len == 0) {
                def.resolve();
            }
        }
        else {
            img.onload = (function (j) {
                return function () {
                    imgs[j] = img;
                    len--;
                    console.log("load");
                    console.log((j + 1) + "/" + list.length);
                    if (len == 0) {
                        def.resolve();
                    }
                };
            })(i);
            img.onerror = function () {
                len--;
                console.log('failed to load image');
            };
        }
    });
    return def.promise();
};