# Release Note

## 0.3版新增及变化的内容
### 1 预加载功能和加载条
```javascript
ns.preload(list, path, each, callback)
```
其中 `list` 是包含路径的数组，`path` 用于补全相对路径，`each` 是每个文件加载完成时执行的函数，`callback` 是回调函数。此外，`ns.preload` 返回一个 Deferred 对象，可用于替换回调函数。

```javascript
ns.loadingbar(list, path, callback)
```
其中 `list` 是包含路径的数组，`path` 用于补全相对路径，`callback` 是回调函数。`ns.loadingbar`返回一个jQuery div。Css样式可于`theme.loadingbarStyle` 和  ` theme.loadingbarInterneStyle` 添加，其中`theme`为NovelScript所应用的主题。

### 2 修改condition的结构，增加每句台词显示前和显示后两个时机
- 前者用于为台词的出现设定条件，
- 后者指定台词结束后的跳转方向
- 两者都可以为台词的显示前后增加运算

规则：
 * condition 是一个包含两个属性的对象，包含的属性是before和after
 * before储存一个布尔值，before不存在或该值为真时，这句台词会出现，反之则会自动跳过
 * 需要注意的是，如果从其他位置跳跃到本句时，若不符合条件，将会改为下一句
 * after返回一个数组[章节，台词位置]，此时本句结束之后将会跳转至相应的章节和台词
 * 如果after不存在，本句结束后将会自然进行下一句
 * 如果after存在且为false，本句结束后游戏结束
 * 如果condition不存在，本句会播放并且结束后进行下一句
 * 以下方代码为例，如果通关次数大于0，本句会出现且连雨遥的好感度+2（请善用函数式语言）
 * 本句结束时，如果连雨遥的好感度大于5，则会跳转到ch2章节的首句，反之游戏结束
 
用例：
```javascript
ns.condition("intro", 4, function (state) {
    return {
        before: (function () {
            if(state.round > 0){
                state.dearness["连雨遥"] += 2;
                return true
            }
            return false
        })(),
        after: (function () {
            if(state.dearness["连雨遥"] > 5){
                return ["ch2", 0]
            }else {
                return false
            }
        })()
    }
});
```

### 3 取消ns.ui，将ns.ui下的属性并入ns，修改ns.frame()的功能，添加自定义主题的入口
涉及到的修改：
- ns.<s>ui.</s>frame
- ns.<s>ui.</s>themes
- ns.<s>ui.</s>initTheme

ns.frame(theme)现在接受一个表示主题的参数，用于热切换主题样式

同时新增了ns.addTheme(themes, df, stageWidth, stageHeight)，四个参数的分别代表ns.themes，复制默认灰色主题对象的函数，舞台的宽度和高度

用例：
```javascript
ns.addTheme(themes, df, stageWidth, stageHeight){
    themes.newTheme = df();
    //...
}
```
主题对象的属性参见文档主页面

### 4 现在支持分步显示的台词了
标记语言： 在对话中使用[+]标记来分割台词，如：最后祝您，[+]身体健康，[+]谢谢

json：如果dialogue为数组，那么它就是一句可以分步显示的台词

效果：自然播放时，分步台词将在每一步停顿，等待操作，在每一步播放过程中点击鼠标将跳过对话，直接显示出目前的分步

### 5 新的选项页面（TODO）
这个功能被推到0.4版了