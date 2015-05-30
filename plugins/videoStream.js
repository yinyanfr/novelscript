/**
 * Created by Ian on 2015/5/30.
 */

var videoStream = function(selector, video){
    var vs = {};
    vs.execute = function(f){
        $(selector).html("<video width='"+$(selector).width()+"' height='" + $(selector).height() + "'><source src='"+video+"' type='video/mp4' /></video>");
        $(selector).click(function(){
            f()
        })
    };
    return vs;
};