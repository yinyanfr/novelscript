# 设定

## align.js
this will be replaced by jquery.align.js as soon as other files be adopted
```javascript
Align.horizontal($) // middle align, (the same for all below) horizontal against its parent
Align.fullHorizontal($) // ... against window
Align.vertical($) // vertical against its parent element
Align.fullVertical($) // ... against window
Align.full($) // horizontal and vertical against its parent element
Align.fullscreen($) // ... against window
```
## typer.js
例子 http://gal.yinyan.fr/demo/typer/

函数同时调用时请注意线程的问题

一个简单的点击按钮变化台词的示例（草稿）

```javascript
        var dial = stack.dialogue;
        var move = function () {
            stage.$dial.html("");
            stage.$main.unbind("click")
                .bind("click", stop);
                // 2. 动作开始后修改鼠标动作，防止重复触发
            ns.typer.flush(stage.$dial, dial, 10, function () {
                stage.$main.unbind("click")
                    .bind("click", move)
                    // 4. 动作正常结束之后，恢复鼠标功能
            })
        };
        var stop = function () {
            stage.$dial.finish().html(dial);
            stage.$main.unbind("click")
                .bind("click", move)
        }; // 3. 动作中的鼠标功能改为停止动作立即显示台词
        stage.$main.bind("click", move)  // 1. 点击鼠标开始动作
```
## preload.js
预加载功能，图片部分引用自 <a href="http://jr3.me/javascriptshi-xian-tu-pian-de-yu-jia-zai-gong-neng/">preload.js by Joe</a>

```javascript
 var list = [......],
 imgs = [];
 $.when(preloadImg(list, imgs)).done(
	function() {
		//do something here
	}
 );
```

## store.js
封装了html5的localstorage 和 sessionstorage
```javascript
var memory = store.existLocal("memory", 0); // memory in localstorage, or = 0
console.log(store.local("memory")) // getter
store.local("memory", 1) // setter
// same syntax to session
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

	表达式，台词发生的条件，默认为true，如为false则台词不发生
* effect

	效果器，文档请参照文件夹 plugin/
* merge
	
	选项功能，
	
	注意，你需要单独为merge功能提供一句台词（这句台词只用于占位，不会被显示）
	```javascript
    var merge1 = {
        text : "去听音乐会",
        condition : false,
        gray : true, // 在不符合条件的情况下是否出现，true为以灰色（不可点选）状态出现
        action : null
    };

    var merge2 = {
        text : "去新年参拜",
        condition : true,
        gray : false,
        action : function(){ // 条件符合时选择后出发的功能
            ns.jumpScript(1,0)
        }
    };

    list["id1"][1]["merge"] = [merge1, merge2];	
	```
* after
	函数，定义台词结束时进行的行为