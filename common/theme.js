/**
 * Created by Ian on 2016/2/27.
 */
ns.initTheme = function (style) {
    if(!style) style = {};
    if(!style.width) style.width = ns.$frame.width();
    if(!style.height) style.height = ns.$frame.height();
    //default
    // generic: defaut skin with version 0.1, global initialisation
    ns.themes.default = {};
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
    ns.themes.default = df();


    // hina: defaut skin with version 0.2
    ns.themes.hina = df();
    (function (hina) {
        hina.contentStyle["background-image"] = "url('tmp/e/sf.png')";
        var widthContent = hina.contentStyle.width;
        var heightContent = hina.contentStyle.height;
        hina.dialogueStyle["border-radius"] = (widthContent/2) + "px/" + (heightContent/2) + "px";
        hina.speakerStyle["background-color"] = "#87CEEB";
        hina.dialogueStyle["background-color"] = "#87CEEB";
        hina.choiceStyle["background-color"] = "rgba(135, 206, 235, 0.5)";
    })(ns.themes.hina);

    // theatre mode
    // theatre: default theatre mode theme packed with ver 0.3
    ns.themes.theatre = df();
    (function (theatre) {
        theatre.dialogueStyle["background-color"] = "transparent";
        theatre.speakerStyle["background-color"] = "transparent";
        theatre.dialStyle["font-size"] = "200%";
        theatre.dialStyle["text-shadow"] = "0 0 8px white";
        theatre.dialStyle["background-color"] = "rgba(150, 150, 150, 0.5)";
    })(ns.themes.theatre);

    // novel mode
    // novel: default novel mode theme packed with ver 0.3
    // dropped temporarily
    ns.themes.novel = df();
    (function (novel) {
        novel.novelMode = true;
        novel.contentStyle.height = "100%";
    })(ns.themes.novel);

    var tmpThemes;

    if(ns.addTheme){
        ns.addTheme(tmpThemes, df, style.width, style.height);
        var k = Object.keys(tmpThemes);
        for(var i = 1; i < k; i++){
            if(ns.themes[k[i]]){
                throw "Overide failed: theme "+k[i]+" already exists"
            }
            ns.themes[k[i]] = tmpThemes[k[i]]
        }
    }

};

ns.themes = {};


// change theme in ns.control.theme