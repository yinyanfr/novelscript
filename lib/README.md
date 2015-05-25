# NovelScript json格式标准

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

##剧本文件

```json
{
  "id01":
  [
    {"speaker":"立夏","dialogue":"下午好。","condition":true,"figure":[false,false,"lixia1.png",false,false],"cg":true,"bg":"classroom1.jpg","bgm":"afternoon.mp3","voice":true,"wait":0,"effect":false},
    {"speaker":"雨遥","dialogue":"再见。","condition":true,"figure":[false,"lixia1.png",false,"yuyao1.png",false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0,"effect":false},
    {"speaker":null,"dialogue":"雨遥离开了。","condition":true,"figure":[false,false,"lixia1.png",false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0,"effect":false}
  ]
}
```