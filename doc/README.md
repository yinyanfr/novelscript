https://www.facebook.com/pages/%E8%90%8C%E5%A8%98%E7%99%BE%E7%A7%91/221502514610838

# NovelScript

## 关于NovelScript
NovelScript是基于jQuery，以目标为制作基于html5的跨平台的galgame的项目，

NovelScript的开发环境为 jQuery 1.11.2

目前工作进度分为三个主要部分和一个外延部分：

* NovelScript Light （released）

	NovelScript Light 是一个实现了基本的galgame功能的JavaScript函数库，包括基本的台词展示，分歧选项，以及作为插件的一系列效果器，
	NovelScript Light 只提供基本的演示功能。
	
* NovelScript UI （6月14日）

	NovelScript UI 具有完整的galgame功能和UI框架，包括游戏记录，个人数据，设置选项等功能，
	对于非JavaScript程序员用户，NovelScript可以直接基于用户提供的galgame文本文件生成一个功能有限的galgame。
	
* NovelScript Server （6月29日）

	NovelScript Server 提供服务器端相关的功能，包括用户账户，剧本收藏，台词评论等功能。

* NovelScript Editor （外延部分）

	用户界面的galgame编辑器
	
## NovelScript Light
<img src="http://yinyan.fr/d/nsldemo.png" />

全局变量占用 ：NovelScript（函数）

### API
```javascript
var ns = NovelScript("#a",list, settingList);
// 新建一个NovelScript实例，三个参数分别为NovelScript场景选择器，储存剧本的变量，外部的设置列表
    ns.initiate();
	//在选择器中建立html文档结构
    ns.slice();
	//开始执行galgame功能
	ns.recover = function
	//回调函数，NovelScript实例执行完毕后执行
```

库与插件的说明请参照相关文件夹中的README.md