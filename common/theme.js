/**
 * Created by Ian on 2016/2/27.
 */
ns.ui.initTheme = function (style) {
    ns.ui.themes.hina = {};
    (function (hina) {
        hina.mainstageStyle = {
            width: style.width,
            height: style.height,
            "background-color": "#f3f3f3",
            "background-size": style.width+"px "+style.height+"px"
        };
        hina.mainstageStyle["background-image"] = "url('tmp/e/koharu.jpg')";
        hina.contentStyle = {
            width: style.width * 0.7,
            height: style.height / 4,
            position: "absolute",
            bottom: 0,
            "background-image": "url('tmp/e/sf.png')"
        };
        hina.dialogueStyle = {
            width: "inherit",
            height: "inherit",
            "background-color": "#87CEEB",
            "opacity": 0.4
        };
        var widthContent = hina.contentStyle.width;
        var heightContent = hina.contentStyle.height;
        hina.contentStyle.left = (style.width - widthContent) / 2;
        hina.dialogueStyle["border-radius"] = (widthContent/2) + "px/" + (heightContent/2) + "px";
        hina.speakerStyle = {
            position: "absolute",
            left: 0,
            top: 0
        };
        hina.dialStyle = {
            "font-size": "150%",
            position: "absolute",
            left: widthContent / 8,
            top: heightContent / 5
        };

    })(ns.ui.themes.hina);
};

ns.ui.themes = {};


// change theme in ns.control.theme