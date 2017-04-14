/**
 * Created by Ian on 2016/2/27.
 */

var json = {
    "room": [
        {
            "speaker": "[音姬]",
            "figure": [
                "otome1.png"
            ],
            "bg": "room.jpg",
            "bgm": "07.mp3",
            "dialogue": [
                "您好，",
                "这是一个NovelScript0.3版本的演示工程。"
            ],
            "multi": true
        },
        {
            "merge": true,
            "mergeBody": [
                "去第三页",
                "去第五页",
                "去听音乐会"
            ],
            "dialogue": "刚才是效果器功能的一个实例（幻灯片），现在是选项分歧功能"
        },
        {
            "speaker": "[由梦]",
            "figure": [
                "",
                "yume1.png"
            ],
            "dialogue": "这里用到的全部图片都来自初音岛2。"
        },
        {
            "speaker": "[雪村]",
            "figure": [
                "otome2.png",
                "",
                "anzu_n.png"
            ],
            "dialogue": "背景音乐来自之后会公开的《立夏》。"
        },
        {
            "speaker": "[雪村]",
            "figure": [
                "",
                "anzu_b.png",
                "yume3.png"
            ],
            "dialogue": "NovelScript的剧本可以用方便的方法写成，详情请见文档。"
        },
        {
            "speaker": "[音姬]",
            "figure": [
                "otome2.png",
                "0",
                ""
            ],
            "dialogue": "这一部分演示了人物立绘的变动方法。"
        },
        {
            "speaker": null,
            "bg": "0",
            "dialogue": "现在黑屏啦。"
        },
        {
            "speaker": null,
            "bg": "classroom.jpg",
            "dialogue": "现在切换到了教室。"
        },
        {
            "speaker": null,
            "bg": "restaurant.jpg",
            "dialogue": "现在切换到了食堂。"
        },
        {
            "speaker": null,
            "cg": "anzu.jpg",
            "dialogue": "CG是覆盖在背景之上的，"
        },
        {
            "speaker": null,
            "cg": "anzu2.jpg",
            "dialogue": "这一部分演示了CG和背景的变动方法。"
        },
        {
            "speaker": null,
            "cg": "0",
            "dialogue": "去除CG后，背景图又回到之前的背景啦。"
        },
        {
            "speaker": null,
            "dialogue": [
                "最后祝您，",
                "身体健康，",
                "谢谢。"
            ],
            "multi": true
        }
    ]
};

$(document).ready(function () {

    ns.initControls = function (setting) {
        setting = setting || ns.default.setting;
        ns.controls.theme = ns.themes[setting.theme];
        // relation amang scripts paragraphes
        ns.controls.relation = {

        };
    };

    ns.director = function () {
        var l = ["Demo site", "Powered by NovelScript 0.3"];
        //ns.dp.get("room", 0)["effect"] = ns.diapo(l, ns.$frame, "black", 1000);

        ns.merge.add("room", 1, [{
            condition: true,
            callback: function () {
                ns.slides.jumpScript("room", 3)
                console.log(ns.state)
            }
        }, {
            condition: true,
            callback: function () {
                ns.slides.jumpScript("room", 5)
            }
        }, {
            condition: false,
            gray: true
        }]);
    };

    var $div = $("<div></div>").css({
        width: 1280,
        height: 720,
        border: "1px solid black",
        margin: 30
    }).appendTo($("body"));
    ns.init(json, $div, {
        theme: "hina",
        path: {
            figure: "tmp/e/",
            cg: "tmp/e/",
            bg: "tmp/e/",
            bgm: "tmp/e/"
        }
    });


    /*
     , {
     theme: "hina",
     relation: {

     },
     path: {
     figure: "tmp/e/",
     cg: "tmp/e/",
     bg: "tmp/e/",
     bgm: "tmp/e/"
     }
     }
     */
    $.when(ns.$deferred)
        .done(function () {
            alert("finished")
        })
});