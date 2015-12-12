/**
 * Created by Ian on 2015/12/12.
 */

var store = (function () {
    var store = {};
    store.info = {};
    if(!localStorage.nsStorage) localStorage.nsStorage = store.info;
    else store.info = localStorage.nsStorage;
    store.save = function () {
        localStorage.nsStorage = store.info
    };
    store.use = function (key, value) {
        if(value === undefined) return store.info[key];
        store.info[key] = value;
        store.save()
    };
    return store
})();