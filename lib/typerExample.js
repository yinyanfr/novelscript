/**
 * Created by Ian on 2015/12/13.
 */

var list = [
    "またこれから俺らのパティ",
    "消して誰でもまねできない",
    "生きざまでど晴れなダンシング",
    "後悔だけはしたくない",
    "道なき道を切り開い",
    "俺だけの答えこの手に",
    "龍が如く夜空に舞い",
    "誇りをかけ叫べ未来に",
    "ワショウイ"
];

function aux() { //正常的点击进行动画
    $("#shell").html("");
    var tmp = list.shift();
    $(window).unbind("click",aux).bind("click",function(){
        aux2(tmp);
    }); // 动画开始后取消点击效果，避免线程冲突
    // 修改点击效果为 aux2(n)
    if (list.length > 0) {
        typer.flush($("#shell"), tmp, 10, function(){
            $(window).unbind("click").bind("click",aux);
        })
    }
}

function aux2(n){
    $("#shell").finish().html(n); // 终止动画
    $(window).unbind("click").bind("click",aux); // 修改点击效果
}


function main() {
    $(window).bind("click",aux);
}

$(document).ready(function () {
    main()
});