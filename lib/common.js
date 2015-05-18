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
    /*
    $("#b").html("载入完成，请点击鼠标~")
    console.log(data);
    var script01 = script("id01",data.id01);
    $("#a").click(function(){
        script01.slice();
    })
    */ // works(localhost)
};

NovelScript.main = function(url) {
    var prepare = {
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            //TODO 递归连三月，堆栈抵万金
            //TODO 放在服务器上返回错误 Not Allowed
            NovelScript.execute(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            NovelScript.remind("Error: " + textStatus + " errorThrown: " + errorThrown);
        }
    };
    $.ajax(prepare);
};
