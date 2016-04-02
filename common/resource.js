/**
 * Created by yan on 16/3/9.
 */

ns.initResource = function (setting) {
    var resource = {};
    resource.images = {};
    resource.audios = {};
    resource.get = function (type, name) {
        //TODO 0.1 not yet preloader
        switch (type){
            case "figure":
                return $("<img />").attr("src", setting.path["figure"] + name);
            case "cg":
                return setting.path["cg"] + name;
            case "bg":
                return setting.path["bg"] + name;
            case "bgm":
                return $("<audio></audio>").attr("src", setting.path["bgm"] + name);
            default:
                throw "No specified type " + type
        }
    };
    return resource
};

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