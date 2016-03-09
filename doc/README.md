# Documentation

## 1. Integrate NovelScript in browser (TODO)
Use ```$ node make.js``` to get the present version of NovelScript after clone the git repo,

or use the release version ```novelscript.min.js```

## 2. Init NovelScript
```javascript
ns.init(data, $frame, callback);
```
Where data is a json Object where script are allocated,

$frame is a jQuery DOM Object where the game is displayed,

callback is a function that will execute after the game is all over.

data是包含剧本文件的json对象, $frame是jQuery DOM对象, 是显示游戏画面的主舞台, callback为回调函数, 在游戏全部结束后执行.

```javascript
var ns1 = Object.create(ns);
var ns2 = Object.create(ns);
```

Use Object.create() to create multiple examples of NovelScript.

使用Object.create()来创建多个NovelScript实例.

## 3. Format of script file
See parser/README.md

## 4. Controls
