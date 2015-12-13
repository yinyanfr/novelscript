# NovelScript 插件格式标准

##效果插件
示例：diapo.js

NovelScript的效果存储于单条台词对象中。

数据类型为对象，通过构造函数建立

单条台词对象中的效果值为true时，将自动继续执行中的对象（如果持续执行）

值为false时，将停止当前效果（如果有）的执行

请使用 pluginName.execute(callbackFunction) 的格式来编写效果触发的函数

### diapo.js
diapo.js 可以在效果器中或在效果器外制作一个按照一定速度自动淡入淡出的换灯片效果

默认的文字显示是在选择器的正中央，依赖Align库来完成居中效果

单独使用时执行方式如下：

全局变量占用： diapo函数
```javascript
$(document).ready(function () {
    var l = (function (n) {
        var res = [];
        for(var i = 1; i <= n; i++){
            res.push($("<img />").attr("src", "media/"+i+".jpg")
                .width($(window).width())
                .height($(window).height()))
        }
        return res
    }(4));
    console.log(l);
    var welcome = diapo(l, $("<div></div>").css({
            // f**king safari
            "position": "absolute",
            "top": 0,
            "left": 0
        }).width($(window).width())
            .height($(window).height())
            .appendTo($("body")), "black", 2000, true);
    welcome.execute();
});
```

### don.js

Notice : don.js is abondoned, an alternative is being coded

用来代替alert()的小东西

全局变量占用：don（函数）
```javascript
// 1. don(text)
    don("摄像机从下面开始くりっ地上来，");
    don("标题画面が咚！");
    /* 下面的过于复杂，看看就好 */
    // 2. don(text,"verify",callbackTrue,callbackFalse)
    don("我同意用户许可协定","verify",function(){
        // true
        // 3. don(text,"input",callback(data))
        don("你同意了许可协定，说一句话吧","input",function(data){
            don("你说的是"+data);
        });
    }, function(){
        // false
        don("你需要同意许可协定");
        don("晚安")
    });
```

### videoStream.js
播放流媒体视频
```javascript
videoStream(selector, videoPath)
```

### effectGroup.js
effectGroup 用来执行一个效果队列 i

参数 async in boolean 是否异步执行， group in [] of {} 效果队列
 
注意：不是所有的effect都能同步执行
