/**
 * Created by Ian on 2015/12/12.
 */

/**
 * closure proto store
 * which packs the localStorage and sessionStorage of HTML5
 * needing modern browser integrating localStorage, sessionStoage and JSON
 * also for those living in EU, this does not use cookie
 */

var store = (function() {
    var store = {};
    store.infolocal = {};
    if(!localStorage.nsStorageLocal) localStorage.nsStorageLocal = JSON.stringify(store.infolocal);
    else store.infolocal = JSON.parse(localStorage.nsStorageLocal);

    store.infosession = {};
    if(!sessionStorage.nsStorageSession) sessionStorage.nsStorageSession = JSON.stringify(store.infosession);
    else store.infosession = JSON.parse(sessionStorage.nsStorageSession);

    store.save = function () {
        localStorage.nsStorageLocal = JSON.stringify(store.infolocal);
        sessionStorage.nsStorageSession = JSON.stringify(store.infosession)
    };
    store.local = function (key, value) {
        if(value === undefined) return store.infolocal[key];
        store.infolocal[key] = value;
        store.save()
    };
    store.session = function (key, value) {
        if(value === undefined) return store.infosession[key];
        store.infosession[key] = value;
        store.save()
    };

    store.existLocal = function (key, value) {
        if(store.infolocal[key] === undefined){
            store.local(key, value);
            store.save()
        }
        return store.infolocal(key)
    };
    store.existSession = function (key, value) {
        if(store.infosession[key] === undefined){
            store.session(key, value);
            store.save()
        }
        return store.session(key)
    };

    store.clear = function (which) {
        which = which || "local";
        if(which == "local") store.infolocal = {};
        else store.infosession = {};
        store.save()
    };

    return store
})();

