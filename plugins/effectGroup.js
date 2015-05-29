/**
 * Created by Ian on 2015/5/29.
 */

var effectGroup = function (async, group) {
    /*
     * effectGroup 用来执行一个效果队列 i
     * 参数 async in boolean 是否异步执行
     *     group in [] of {} 效果队列
     * 注意：不是所有的effect都能同步执行
     */
    var eg = {};
    eg.group = group; // 储存group，防止修改外部变量
    eg.executionAsync = function(f){
        // 异步执行的情况 io rec
        if(eg.group.length === 0){
            f(); // callback
        }else{
            eg.group.shift().execute(function () {
                eg.executionAsync(f)
            });
            // 自己试着理解这个片段
        }
    };
    eg.executionSync = function(f){
        // 同步执行的情况 i
        for(var i = 0; i < eg.group.length; i++){
            eg.group[i].execute(function(){
                return 0
            })
        }
        f()
    };
    eg.execute = function(f){
        if(async){
            eg.executionAsync(f)
        }else{
            eg.executionSync(f)
        }
    };
    return eg;
};