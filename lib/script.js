/**
 * Created by Ian on 2015/5/18.
 */

var script = function (id, list) {
    var script = {};
    script.id = id;
    script.list = list;
    script.slice = function(){
        /*
        $("#b").html(list[0].speaker + list[0].dialogue);
        if(script.list.length>1)
            script.list.shift();
        else alert("hha")
        */ // works (localhost)
    };
    return script;
};