# Documentation
```
This is a document for NovelScript 0.1 "hina"
这是为NovelScript 0.1 "hina" 版本准备的文档
```

## 1. Get Started 开始使用
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

ns.start returns a ```$.Deferred.promise()``` Object, which means you can manually add to a callback function:

此函数返回```$.Deferred.promise()```对象，因此可以手动添加回调函数：
```javascript
$.when(ns.start())
  .done(function(){
      ...
    })
  .fail(function(){
      ...
    })
```

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
[merge][我在漫无目的的生活里突然有了要做的事情, 我遇到了改变了我漫无目的的的生活的人][我在意话剧的事情, 我在意喻南之]
/*
 * 通过[merge]为剧本增加分歧选项， 第一个括号里是选项文本，第二个括号（可选）是简单模式中显示的选项文本
 * 你仍然需要在程序中指定各选项的出现的条件和callback， 参见lib/README.md
 */
```

#### 由以上文本生成的JSON
```json
{"welcome":[{"speaker":null,"dialogue":"梦里不觉秋已深，余情岂是为他人。 "},{"speaker":null,"dialogue":""},{"speaker":"[泽村]","figure":["sawamura_tdr.png","katou_normal.png"],"bg":"ano_ona_no_house.jpg","bgm":"ready.mp3","dialogue":"我和伦也才不是那种关系！"},{"speaker":null,"dialogue":" "},{"speaker":"[霞丘]","figure":["","kasumigaoka_ironic.png","hyoutou_normal.png"],"bgm":"star.mp3","dialogue":"毕竟是冒牌的青梅竹马。"},{"speaker":null,"dialogue":""},{"speaker":null,"figure":["0","0","0"],"dialogue":"我还是继续装睡吧……"},{"speaker":null,"dialogue":""},{"merge":true,"mergeBody":["我在漫无目的的生活里突然有了要做的事情","我遇到了改变了我漫无目的的的生活的人"]},{"speaker":null,"dialogue":""}]}
```

## 3. Settings (TODO)
