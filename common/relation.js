/**
 * Created by Ian on 2016/3/6.
 */

/**
 * TODO so guess what i've done to find a next node in the script?
 * @returns {{}|*}
 */
ns.initRelation = function () {
    var relation = ns.controls.relation;
    // place defaut
    var scripts = Object.keys(ns.data);
    for(var i = 0; i < scripts - 1; i++){
        if(!Object.keys(relation).indexOf(scripts[i])){
            relation[scripts[i]] = {
                condition: true,
                child: scripts[i + 1]
            }
        }
    }
};

ns.relation = {};