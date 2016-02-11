/**
 * Created by Ian on 2016/2/6.
 */

/**
 * function prototype
 * a search tree for storyline, working with novelscript json file
 * @param id: string
 * @param parent: ns.story, pointer to its parent piece
 */
ns.story = function (id, parent) {
    var story = {};
    story.id = id;
    story.parent = parent || null;
    story.children = [];

    story.isFirst = function () {
        return !story.parent
    };

    story.getData = function (id, data) {
        return data[id]
    };

    story.find = function (f) {
        if($.isFunction(f)){
            if(!story.children.length){
                // when the last node of a branch is reached
                if(f(story.id)) return true;
            }else {
                if(f(story.id)) return true;
                else {
                    for(var i = 0; i < story.children.length; i++){
                        if(story.children[i].find(f)) return true
                    }
                    return false
                }
            }
        }else {
            // f is String
            return story.find(function (id) {
                return this.id == id
            })
        }
    };


    return story

};

ns.storyline = (function () {
    var storyline = {};
    storyline.init = function (data) {
        storyline.data = data;
        storyline.keys = Object.keys(data);
        if(storyline.keys.length) storyline.node = ns.story(storyline.keys[0]);
        else throw "failed to load script data"
    };

})();