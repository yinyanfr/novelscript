/**
 * Created by Ian on 2016/4/17.
 */

ns.initMerge = function () {
    var merge = {};
    var dp = ns.dp;
    merge.add = function (script, position, list) {
        var page = dp.get(script, position);
        if(!page.merge){
            console.log("Cannot add merge to a non-merge page.");
            return false
        }
        page.mergeFunctions = {};
        for(var i = 0; i < page.mergeBody.length; i++){
            page.mergeFunctions[page.mergeBody[i]] = list[i]
        }
        return true
    };
    merge.listNonDistrib = function () {
        var list = [];
        dp.throughout(function (page) {
            if(page.merge && !page.mergeFunctions){
                list.push(page)
            }
        });
        if(list.length){
            console.log("Still merge pages not added");
            console.log(list)
        }
    };

    return merge
};