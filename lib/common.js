/**
 * Created by Ian on 2015/5/18.
 */

var NovelScript = {}; // Let us Rock'n Roll!

NovelScript.log = {
    info : [],
    log : function(){
        console.log(NovelScript.log.info);
    }
};

NovelScript.remind = function(n){
    //TODO 新提示框样式
    NovelScript.log.info.push(n);
    alert(n);
};

NovelScript.execute = function(data){
    console.log(data);
};

NovelScript.main = function(url) {
    var prepare = {
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            //TODO 递归诚可贵，堆栈值万钱
            NovelScript.execute(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            NovelScript.remind("Error: " + textStatus + " errorThrown: " + errorThrown);
        }
    };
    $.ajax(prepare);
};
