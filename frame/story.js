/**
 * Created by Ian on 2016/2/6.
 */

/**
 * function prototype
 * a search tree for storyline
 * @param id: generic, something that indique that piece of story
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

    story.push = function (child) {
        if(child.parent && child.parent === story){
            story.children.push(child)
        }
        return story
    };

    story.searchById = function (id) {
        if(story.id == id) return story;
        //TODO wtf...
    }
};