# NovelScript 插件格式标准

##效果插件
示例：diapo.js

NovelScript的效果存储于单条台词对象中。

数据类型为对象，通过构造函数建立

单条台词对象中的效果值为true时，将自动继续执行中的对象（如果持续执行）

值为false时，将停止当前效果（如果有）的执行

请使用 pluginName.execute(callbackFunction) 的格式来编写效果触发的函数