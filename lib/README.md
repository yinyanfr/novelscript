# NovelScript json格式标准

## typer.js
例子 http://gal.yinyan.fr/demo/typer/

函数同时调用时请注意线程的问题
```javascript
function aux() {
    $("#shell").html("");
    $(window).unbind("click",aux);
    if (list.length > 0) {
        typer.flush("#shell", list.shift(), 10, function(){
            $(window).bind("click",aux);
        })
    }
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