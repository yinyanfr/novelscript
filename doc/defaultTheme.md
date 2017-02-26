# 默认的主题

这是NovelScript默认灰色主题的css，此主题采用流动式设计以保证各元素在各种舞台大小下的稳定位置

```javascript
// 其中style为 {width: stageWidth, height: stageHeight}
var df = function(){
        var df = {};
        df.mainstageStyle = {
            width: style.width,
            height: style.height,
            "background-color": "#f3f3f3",
            "background-size": style.width+"px "+style.height+"px",
            position: "relative",
            "font-family": "YouYuan, ZhunYuan, Microsoft YaHei UI, Microsoft Yahei, 黑体"
        };
        df.figureStyle = {
            width: style.width,
            position: "absolute",
            bottom: 0,
            "text-align": "center"
        };
        df.figureImageStyle = {
            height: 0.8 * style.height
        };
        df.contentStyle = {
            width: style.width * 0.7,
            height: style.height / 4,
            position: "absolute",
            bottom: 0
        };
        df.dialogueStyle = {
            width: "inherit",
            height: "inherit",
            "background-color": "gray",
            "opacity": 0.4
        };
        // add novel mode token
        df.novelMode = false;
        var widthContent = df.contentStyle.width;
        var heightContent = df.contentStyle.height;
        df.contentStyle.left = (style.width - widthContent) / 2;
        df.speakerStyle = {
            "background-color": "gray",
            position: "absolute",
            left: 0,
            top: 0
        };
        df.dialStyle = {
            "font-size": "150%",
            position: "absolute",
            left: widthContent / 8,
            top: heightContent / 5
        };
        df.mergeStyle = {
            width: 0.3 * style.width,
            position: "absolute",
            top: 0.25 * style.height
        };
        var mergeWidth = df.mergeStyle.width;
        df.mergeStyle.left = (style.width - mergeWidth) / 2;
        df.choiceStyle = {
            width: "inherit",
            height: "45px",
            "background-color": "gray",
            "font-size": "150%",
            "padding": "5px",
            "margin-bottom": "10px",
            "text-align": "center"
        };
        df.choiceStyle["line-height"] = df.choiceStyle.height;

        return df;
    };
```