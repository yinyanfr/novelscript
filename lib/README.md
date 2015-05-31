# 设定

## typer.js
例子 http://gal.yinyan.fr/demo/typer/

函数同时调用时请注意线程的问题

一个简单的点击按钮变化台词的示例（草稿）

```javascript
function aux() { //正常的点击进行动画
    $("#shell").html("");
    var tmp = list.shift();
    $(window).unbind("click",aux).bind("click",function(){
        aux2(tmp);
    }); // 动画开始后取消点击效果，避免线程冲突
    // 修改点击效果为 aux2(n)
    if (list.length > 0) {
        typer.flush("#shell", tmp, 10, function(){
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
```

## 剧本文件格式标准（已更新）

```json
{
    "id1":
        [
            {"slice":0,"speaker":"南之","dialogue":"你看我这台电脑，花了八块钱，平时用的功能，连八分之一都到不了","figure":[false,false,"test1.png",false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0},
            {"slice":1,"speaker":"南之","dialogue":"等于说我花了八块钱，其中有七块钱，我都用不到","figure":[false,false,true,false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0},
            {"slice":2,"speaker":"雨遥","dialogue":"我都会用！","figure":[false,"test1.png",false,"test4.png",false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0}
        ],
    "id2":
        [
            {"slice":0,"speaker":"雨遥","dialogue":"接下来呢就是我们AIPC极限挑战的时间了，我们挑战的内容是什么呢","figure":[false,false,false,false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0},
            {"slice":1,"speaker":"南之","dialogue":"AIPC融合了全球顶尖的病毒技术，会导致电脑的中毒，包括上网聊天看电影，word，excel，幻灯片","figure":[false,false,false,false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0},
            {"slice":2,"speaker":"雨遥","dialogue":"太厉害了！","figure":[false,false,false,false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0},
            {"slice":3,"speaker":"南之","dialogue":"看这样一台AIPC，他已经感染到了病毒，他的鼠标已经不会正常的移动，可能会花几个小时的时间继续去预装系统","figure":[false,false,false,false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0},
            {"slice":4,"speaker":"南之","dialogue":"然而我们这一台台式机却依然很流畅，可以正常地到网站上去浏览，所以它是一台永远会中病毒的电脑","figure":[false,false,false,false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0},
            {"slice":5,"speaker":"雨遥","dialogue":"这样我们在上网的时候，被病毒袭击了！","figure":[false,false,false,false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0},
            {"slice":6,"speaker":"南之","dialogue":"还不仅仅如此，AIPC内置了病毒写保护的功能，即使你在工作学习中不小心跌落到了地上","figure":[false,false,false,false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0},
            {"slice":7,"speaker":"雨遥","dialogue":"天哪！","figure":[false,false,false,false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0},
            {"slice":8,"speaker":"南之","dialogue":"也没有关系，看，病毒依然在正常的运作！","figure":[false,false,false,false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0}
        ],
    "id3":
        [
            {"slice":0,"speaker":"雨遥","dialogue":"想买台电脑，便宜的太贵，轻便的太重","figure":[false,false,false,false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0},
            {"slice":1,"speaker":"南之","dialogue":"AIPC办公能不能用，当然，你看我在办公室用这个小的，出门，大的","figure":[false,false,false,false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0}
        ]
}
```
同时占用以下属性名：

* condition
* effect
* merge
* after