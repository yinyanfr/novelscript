```
Notice: Strange way of javascript is being used.
```

# What's does NovelScript do?
- from simple script
```
[script: room]
[音姬][otome1.png][bg: room.jpg][bgm: 07.mp3]这是一个NovelScript0.1版本的演示工程。
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
最后祝您，身体健康，谢谢。
```
- to visual novel

  <img src="http://gal.yinyan.fr/demo/hina/new42.png" />

<a href="http://gal.yinyan.fr/demo/hina/">Demo Site</a>

```
Version 0.1 is released, with its demo site published

By the way, the current version is published without preloading functions,
so you may would like to wait a little while before that all pictures are loaded

这个版本没有preloading，所以在图片加载完成前你可能需要等待一段时间
```

# Documentation
<a href="https://github.com/yinyanfr/NovelScript/tree/master/doc">点此查阅文档 Documentation</a>

# Process
## changement of developping plan
All codes are being rebuild, but are not back to zero. Current legacy is sufficient to build several releasing versions.

The new plan aims to quick iteration of versions in order to suit the process of the game "Lixia" for which novelscript is served.

游戏的剧本,音乐,绘画工作已经开始,NovelScript将为了配合游戏进度进行重新开发,
新的开发计划基于已有代码,希望在短期内快速迭代版本,以适应游戏开发的需要.

## checked
### NovelScript 0.1 "hina"

Version 0.1 is the base of the whole project, which provides a basic presentation of a powerpoint-like visual novel,
with dialogue, portrait, background dessin and simple music playing functions.

进度65% 0.1版本是项目的基础,将实现一个单纯的galgame展示功能

## ongoing
### NovelScript 0.2 "hane"
85%

Version 0.2 will add to merge function("the choices"), to Novelscript, which is actually there is present code.
And effects as well, which is also builded in present code, and will finally be dicided its structure.

进度85% 0.2 版本将会加入已有的分歧和效果器系统
### NovelScript 0.3 "karata"
15%

Version 0.3 will start to bring a framework of interface that holds the main process of NovelScript.

Also, the preloading feature will be completed

进度15% 0.3版本将提供一个简单的界面接口，同时预加载功能将在此版本中完成
## togo
### NovelScript 0.4 "Naru"
In version 0.4, the functionality of music playing will be redesigned so as to allow controls and sound effects.

0.4版本将重新设计音乐播放器,并修改音乐和音效的逻辑
### NovelScript 0.5 "iroha"
A option menu will be added to Version 0.5

0.5 版本将会加入游戏选项菜单
### NovelScript-light
Novelscript 0.5 will be released as NovelScript-light,

and the first game "Lixia intro" will be released using NovelScript-light

NovelScript-light将根据0.5版本发布,同时发布基于此项目的游戏"立夏 序章"

## future plan
### NovelScript 0.6 "kizuna"
New Feature:
    1. storyline and relationship plan,
    2. album
    3. default prototype of relationship and merge system

新功能: 1. 游戏段落分歧结构图和人物关系图, 2. 相册和音乐集功能, 3. 建立人物关系系统

### NovelScript 0.7 "tsubasa"
这一版本将开始引入本项目最重要的功能：通过对剧本的识别，自动为台词分配角色立绘

# Credit

<a href="https://segmentfault.com/a/1190000000684923">preload.js by Joe</a>
