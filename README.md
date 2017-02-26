```
注意 - 非主流的javascript
出于开发者的怪癖：
本项目的思路和代码实现中包含大量函数式编程的内容
本项目使用es5和jQuery
本项目不使用java式的COO方法

另外英文文档已经停止继续提供了 
Documents in English been stopped with no demand being raised during the time
```

# What's does NovelScript do?
- from simple script
```
[script: room]
[音姬][otome1.png][bg: room.jpg][bgm: 07.mp3]这是一个NovelScript0.2版本的演示工程。
[merge][去第三页, 去第五页, 去听音乐会]刚才是效果器功能的一个实例（幻灯片），现在是选项分歧功能
[由梦][, yume1.png]这里用到的全部图片都来自初音岛2。
[雪村][otome2.png, , anzu_n.png]背景音乐来自之后会公开的《立夏》。
[雪村][, anzu_b.png, yume3.png]NovelScript的剧本可以用方便的方法写成，详情请见文档。
[音姬][otome2.png, 0, ]这一部分演示了人物立绘的变动方法。
[bg: 0]现在黑屏啦。
[bg: classroom.jpg]现在切换到了教室。
[bg: restaurant.jpg]现在切换到了食堂。
[cg: anzu.jpg]CG是覆盖在背景之上的，
[cg: anzu2.jpg]这一部分演示了CG和背景的变动方法。
[cg: 0]去除CG后，背景图又回到之前的背景啦。
最后祝您，[+]身体健康，[+]谢谢。
```
- to visual novels

  <img src="http://gal.yinyan.fr/demo/hina/new42.png" />
  <br />
  <img src="http://gal.yinyan.fr/demo/hane/hane.jpg" />

<a href="http://gal.yinyan.fr/demo/hane/">Demo Site</a>

## 主要特点
- 简化的剧本标记语言：
  - 格式简单，不需要写代码
  - 通过简单的增删标记来修改媒体，不需要重复书写
- 完全可定制的外观
- 插件式的程序结构

# Documentation
<a href="https://github.com/yinyanfr/NovelScript/tree/master/doc">点此查阅文档 Documentation</a>

# ReleaseNote
目前的版本：0.3 "sodatsu"
- 新增和修改
    - 修改condition的结构，增加每句台词显示前和显示后两个时机
    - 取消ns.ui，将ns.ui下的属性并入ns，修改ns.frame()的功能，添加自定义主题的入口
    - 现在支持分步显示的台词了
- bug修正
    - 修改0.2版本错误封入的旧版本parser.js
    - 修改第一页无法插入动画的错误
<a href="https://github.com/yinyanfr/NovelScript/blob/master/doc/ReleaseNote.md">点此查阅 ReleaseNote</a>

下一版本的更新计划：0.4 "naru"
- 音乐播放器
- 选项菜单

# Credit
PreloadJS https://github.com/CreateJS/PreloadJS

SoundJS https://github.com/CreateJS/SoundJS

JQuery-Snowfall https://github.com/loktar00/JQuery-Snowfall
