/**
 * Created by yan on 16/3/9.
 */

ns.resource = {};
ns.resource.images = {};
ns.resource.audios = {};

ns.loadResource = function () {
    var def = $.Deferred();
    var images = ns.controls.images;
    var audios = ns.controls.audios;
    // load images
    $.when(ns.preloadImage(images, ns.resource.images))
        .done(function () {
            $.when(ns.preloadAudio(audios, ns.resource.audios))
                .done(function () {
                    def.resolve()
                })
                .fail(function () {
                    throw "Audio preloading failed."
                })
        })
        .fail(function () {
            throw "Images preloading failed"
        });
    return def.promise();
};