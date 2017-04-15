/**
 * Created by Ian on 2016/3/6.
 */

/**
 * relation 是早期版本用于制造剧本之间的连接的方式
 * 在新版本中这个功能被condition.after代替
 * 但是relation保留了一个默认将所有剧本首位相连的功能，所以现在只作为这种默认连接的生成器保留
 * 在初始化的过程中，relation的初始化比condition晚，所以condition会覆盖relation
 * @returns {{}|*}
 */
ns.initRelation = function () {
    var relation = ns.controls.relation;
    // place defaut
    var scripts = Object.keys(ns.data);
    for(var i = 0; i < scripts.length - 1; i++){
        if(Object.keys(relation).indexOf(scripts[i]) === -1){
            relation[scripts[i]] = [{
                condition: true,
                child: scripts[i + 1],
                position: 0
            }]
        }
    }
    // the last one
    relation[scripts[i]] = null;

    return relation
};

ns.relation = {};