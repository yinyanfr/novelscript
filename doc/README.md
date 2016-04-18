# Documentation
```
At least we have something out， functions are coming soon in future versions.
至少我们有个雏形了，其他的功能会稍后出现在后续版本中
```

```
This is a document for NovelScript 0.2 "hane"
这是为NovelScript 0.2 "hane" 版本准备的文档
```

## 0. Functions to Expect in Next Versions
* bgm and voice
* save and load
* preloader (packed)
* interface

## 1. Get Started 开始使用
### 1.0 Get Nightly Build 获得当前开发中的版本
```bash
$ git clone https://github.com/yinyanfr/NovelScript.git
$ npm install argv
$ npm install minify
$ node tool/make.js
```
and get ```res.js``` and ```res.min.js``` in tool/.

```res.js``` 和 ```res.min.js```将在 tool 文件夹中生成。
### 1.1 Integrate NovelScript
```html
<script src="path/NovelScript.min.js"></script>
```
NovelScript occupies 2 global Javascript variables as ```NovelScript``` and ```ns```, no DOM object is occupied. NovelScript is based on jQuery, please import it at first.

NovelScript目前只占用```NovelScript```和```ns```两个Javascript全局变量，不占用任何DOM对象。NovelScript基于jQuery开发，请在引用NovelScript之前引用之。

### 1.2 Create an Example
You can use ```ns``` directly, or duplicate it:

你可以直接使用变量```ns```，或将其复制：
```javascript
var hina = Object.create(ns);
```

### 1.3 Init NovelScript
```javascript
ns.init(data, $frame, setting);
```
Where data is a json Object where script are allocated,

$frame is a jQuery DOM Object where the game is displayed,

setting is a Object containing settings, default value is ns.default.setting

data是包含剧本文件的json对象, $frame是jQuery DOM对象, 是显示游戏画面的主舞台, setting 是包含配置信息的对象，默认值为 ns.default.setting

### 1.4 Start the game
```javascript
ns.start(script, position);
```
This will start the game and display the slide from script ```script``` and position ```position```, by default, ```script``` and ```position``` points to the first slide.

此函数将开始游戏，并展示参数所指向的剧本名和页数，默认值为第一个剧本的第一页


## 2. Script Parser 剧本生成器
NovelScript is designed to reduce redundant works, as for script writers, NoveScript Script Parser can generate the JSON data needed from simple formatting script as:

NoveScript 的设计意图是减少重复的行动，在剧本创作方面，NoveScript Script Parser 可以将按照一定格式书写的剧本转化为程序需要的JSON 对象：

### 2.1 Get Started 开始使用
```
It is recommanded that you use the back-end version for static files
推荐使用后端版本转换静态文件以减少加载时间
```
#### 后端版本 Back-End Version
```
$ npm install argv

$ node parser.js input.txt > output.json
```
#### 前端版本 Front-End Version（parserFront.js）
```javascript
var json = ns.parseScript(data) // data : string, the content of input.txt
```
### 2.2 规则 （English Version under Construction）
```
// 这是注释
/*
 * 这也是注释
 */
[script: welcome] // 【必须】使用script来标明剧本段落名，接受字母数字下划线
梦里不觉秋已深，余情岂是为他人。 // 这是一句单独的台词
         // 像这样只包含空格的一行仍然会被当作有效行
// 内容的设置
[泽村][sawamura_tdr.png, katou_normal.png][cg: party.jpg][bg: ano_ona_no_house.jpg][bgm: ready.mp3]我和伦也才不是那种关系！
/*
 * 通过其他的[]来标记说话人和其他内容，如无特殊说明，引用的文件名接受字母数字下划线横线，不接受汉字和特殊符号
 * 1. 如果有说话人，必须放在第一位，其他部分顺序不限，说话人可以接受汉字字母数字下划线横线
 * 2. 人物立绘为一个javascript数组格式，，扩展名只接受png，立绘在取消或者变化之前会一直保留屏幕上
 * 3. cg用[cg: ]来标识，，扩展名只接受jpg, cg存在时会覆盖立绘和背景，cg在取消或者变化之前会一直保留屏幕上
 * 4. bg用[bg: ]来标识，，扩展名只接受jpg, bg在取消或者变化之前会一直保留屏幕上
 * 5. bg用[bg: ]来标识，，扩展名接受mp3|ogg, bgm在取消或者变化之前会一直播放
 * 6. 不用[]标记的是台词
 */
// 内容的变化
[霞丘][, kasumigaoka_ironic.png, hyoutou_normal.png][bgm: star.mp3]毕竟是冒牌的青梅竹马。
/*
 * 1. 说话人和台词不会继承，每一句之间是独立的
 * 2. cg bg bgm 会继承，声明新文件会改变原来的
 * 3. 立绘会继承，立绘的变化将基于上一句台词时的立绘状况：
    在本句中留空的项会继承对应之前的台词的立绘，改变的项会改变上一句对应的位置的立绘，添加的项会增加到新位置
 */
// 内容的删除
[0,0,0][cg: 0][bg: 0][bgm: 0]我还是继续装睡吧……
/*
 * 1. 立绘仍然继承上一句台词，在对应的位置写入0来消除这个位置的立绘
 * 2. cg bg bgm 也通过写入0来消除，消除cg会恢复原先的背景，消除背景背景会变成默认图片（ns.default.ui.bg），消除bgm音乐会停止
 */
 // 特殊 （0.2版本加入）
 [merge][我在漫无目的的生活里突然有了要做的事情, 我遇到了改变了我漫无目的的的生活的人]我在想什么呢？
 /*
  * 通过[merge]为剧本增加分歧选项， 第一个括号里是选项文本，括号之后的是对话的文本内容
  * 你仍然需要在程序中指定各选项的出现的条件和callback， 参见doc/README.md - 4.2 ns.director
  */
```

#### 由以上文本生成的JSON
```json
{"welcome":[{"speaker":null,"dialogue":"梦里不觉秋已深，余情岂是为他人。 "},{"speaker":null,"dialogue":""},{"speaker":"[泽村]","figure":["sawamura_tdr.png","katou_normal.png"],"bg":"ano_ona_no_house.jpg","bgm":"ready.mp3","dialogue":"我和伦也才不是那种关系！"},{"speaker":null,"dialogue":" "},{"speaker":"[霞丘]","figure":["","kasumigaoka_ironic.png","hyoutou_normal.png"],"bgm":"star.mp3","dialogue":"毕竟是冒牌的青梅竹马。"},{"speaker":null,"dialogue":""},{"speaker":null,"figure":["0","0","0"],"dialogue":"我还是继续装睡吧……"},{"speaker":null,"dialogue":""},{"merge":true,"mergeBody":["我在漫无目的的生活里突然有了要做的事情","我遇到了改变了我漫无目的的的生活的人"]},{"speaker":null,"dialogue":""}]}
```

## 3. Settings
In current version, the argument ```setting``` provides just 2 settings, theme and path, where there is merely one theme (other themes and costume theme functions are on there way)

此版本中```setting```只能设置主题和路径，其中主题只有这一种（其他主题和自定义主题功能将在后续版本提供）

Example:

例子：
```javascript
{
    theme: "hina",
    path: {
        figure: "tmp/e/",
        cg: "tmp/e/",
        bg: "tmp/e/",
        bgm: "tmp/e/"
    }
}
```

## 4. ns.initControls and ns.director() [0.2+]
### 4.1 ns.initControls
 - ```controls.js``` is no more seperated, ```ns.initControls``` is used instead. See example from page.js (in the source code).

 - ```controls.js``` 不在作为一个独立文件，改为使用```ns.initControls```函数。请参照源代码中的page.js

 Example:
 ```javascript
 ns.initControls = function (setting) {
        setting = setting || ns.default.setting;
        ns.controls.theme = ns.ui.themes[setting.theme];
        // relation amang scripts paragraphes
        ns.controls.relation = {

        };
    };
  ```

-  where ```setting``` is the same object used in ```ns.init```, and ```ns.controls.theme``` controls the default theme.

-  ```setting``` 与 ```ns.init``` 中使用的参数是同一个对象， ```ns.controls.theme``` 控制默认主题。

#### 4.1.1 ns.contols.relation

Relation is imported to direct a simple structure of scripts, by controling the possibilities when a script reaches an end. The default relationship is linaire.

Relation 提供了对剧本间关系的简单控制，默认的关系是线性的。

Example addition to relation:
```javascript
    ns.controls.relation = {
        "room": [
            {
                condition: true,
                child: "room2",
                position: 0
            }, {
                condition: true,
                child: "room2",
                position: 3
            }
        ]
    }
```

When multiple possibilities exists, the first one the condition of which is true will take effect.

当存在多个可能性时，第一个condition 为 true 的可能性将会生效。


### 4.2 ns.director
 - ```ns.director``` is the function where you can add events such as effet and confilict choices to the play.

 - ```ns.director``` 函数用于添加播放效果和分歧选项。

 Example:
 ```javascript
 ns.director = function () {
        var l = ["为什么会变成这样呢？", "第一次有了喜欢的人", "第一次有了一生的挚友", "为什么会这样呢？"];
        ns.dp.get("room", 0)["effect"] = ns.diapo(l, ns.$frame, "black", 1000);

        ns.merge.add("room", 1, [{
            condition: true,
            func: function () {
                ns.slides.jumpScript("room", 3)
            }
        }, {
            condition: true,
            func: function () {
                ns.slides.jumpScript("room", 5)
            }
        }, {
            condition: false,
            gray: true
        }]);
    };
  ```
#### 4.2.1 Effects
Effects are shown <b>before</b> everything including conflicts. Please find the instruction of each effect in plugin/README.pdf

效果会最先执行，请于 plugin/README.pdf 获知每个效果器的用法

- ```execute``` is required for every effect plugins, a async effect that passes a callback function should contain a callback function as parameter in ```execute```
- ```execute``` 是必须的，用于执行效果，需要借助异步执行的效果需要在execute的参数中包含一个回调函数

- ```effectType``` provide the way of executing an effect.
- ```effectType``` 用于表示效果的执行方式

Example:
```javascript
diapo.effectType = {
  sync: false,
  deffered: false
}
```

where ```sync``` shows if this effect is synchronised, and ```deffered``` is true when this effect.execute return a $.Deffered() Object, and is false when it passes a callback function

其中 ```sync``` 表示效果是否同步的， ```deffered``` 为真时 effect.execute 返回一个$.Deffered()对象，为假时借助回调函数传递信息

#### 4.2.2 Confilicts
No one knows why in NovelScript confilicts are called ```merge```.

不知道为什么，分歧选项在NovelScript里被叫做 ```merge```。

- ```ns.merge.listNonDistrib()``` lists out every merge that is not distributed with its functions, and it is automatically checked.
- ```ns.merge.listNonDistrib()``` 会列出还没有分配功能的分歧，会自动执行。

Example of a choice:
```javascript
  {
    condition: true,
    gray: true,
    callback: function () {
        ns.slides.jumpScript("room", 3)
    }
  }
```

where ```condition``` controls if this choice will be shown, ```gray``` the choice will show up but in gray and not available fot clicking if true and the condition if false, ```callback``` is the function.

其中 ```condition``` 控制选项出现的条件， ```gray```为 true 且 condition 为 false 时选项会以灰色无法点击的状态出现， ```callback``` 是点击时执行的函数。

## 5. Customization 自定义功能
### 5.1 callback 回调函数
The callback function is replaced by ```$.Deferred()```

NovelScript的回调函数功能现在由```$.Deferred()```承担

- ```ns.$deferred``` is a ```$.Deferred()``` Object, which means you can manually add to a callback function:

其中 ```ns.$deferred``` 是一个```$.Deferred()```对象，因此可以手动添加回调函数：

```javascript
$.when(ns.$deferred)
  .done(function(){
      ...
    })
  .fail(function(){
      ...
    })
```

- ```done``` will be triggered once the game script reaches an end.
剧本文件通过游戏浏览完成之后，```done```将被触发

## 6. API Reference API文档 （TODO）
