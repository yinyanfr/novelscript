/**
 * Created by Ian on 2015/5/20.
 */

(function(){
    var times = 1;
    var getWindowLeft = function (selector) {
        return ($(window).width() - $(selector).width()) / 2;
    };
    var getWindowTop = function (selector) {
        return ($(window).height() - $(selector).height()) / 2;
    };
    don = function(text,type,yes,no){
        var id = "don"+times;
        var pid = "#"+"don"+(times-1);
        var sid = "#"+id;
        if(times === 1) {
            $("body").append('<div class="don" id="' + id + '">' + text + '</div>');
        }else{
            $(pid).before('<div class="don" id="' + id + '">' + text + '</div>');
        }
        console.log(text);
        $(".don").width(300)
            .height(200)
            .css("border","1px solid gray")
            .css("background-color","#f3f3f3")
            .css("position","fixed")
            .css("top",getWindowTop(".don"))
            .css("left",getWindowLeft(".don"));
        if(!type) {
            $(sid).append('<button type="button" id="donok">'+'ok'+'</button>');
            $("#donok").click(function () {
                $(sid).hide();
            });
            times++;
            return true;
        } else if(type == "verify"){
            $(sid).append('<button type="button" id="donyes">'+'是'+'</button>');
            if(no) {
                $(sid).append('<button type="button" id="donno">' + '否' + '</button>');
            }
            times++;
            $("#donyes").click(function(){
                $(sid).hide(0,yes);
            });
            if(no) {
                $("#donno").click(function () {
                    $(sid).hide(0,no);
                });
            }
        } else if(type == "input"){
            $(sid).append('<input type="text" id="dontext" value="" />');
            $(sid).append('<input type="submit" id="donsub" value="ok" />');
            times++;
            var res = "";
            $("#donsub").click(function(){
                $(sid).hide(0,function(){
                    yes($("#dontext").val());
                });
            });
        }
    };
})();