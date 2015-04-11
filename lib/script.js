/**
 * Created by Ian on 2015/4/11.
 */

function Script(id) {
    this.id = id;
    this.taihon = [];
}

Script.prototype.taihonAppend = function(seri){
    this.taihon.push(seri);
};