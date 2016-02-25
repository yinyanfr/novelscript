/**
 * Created by yan on 15/11/28.
 * plugin of NovelScript 1.0 "Hina"
 * jquery 1.11 needed
 */

/**
 * plugin NovelScript, target will shrink automatically
 * TODO bugs remaining
 * @param $target : $, target that will shrink
 * @param distance : float, rate that target react against the movement of mouse
 * @param count : int, frequency of movement when automatically
 */
function shrink($target, distance, count) {
    var shrink = {};
    distance = 4;
    count = count || 4;
    var step = 0;//计数器
    var off = $target.offset();

    function pos() {
        shrink.step = shrink.step || 0;
        shrink.step = shrink.step == 4 ? 0 : shrink.step;
        var set = {
            0: {x: 0, y: -1},
            1: {x: -1, y: 0},
            2: {x: 0, y: 1},
            3: {x: 1, y: 0}
        };
        return set[shrink.step++];
    }

    shrink.execute = function () {
        shrink.step = 0;
        var timer = setInterval(function () {
            var set = pos();
            $target.offset({top: off.top + set.y * len, left: off.left + set.x * len});
            if (step++ >= c) {
                $target.offset({top: off.top, left: off.left});
                clearInterval(timer);
            }
        }, 45);
    };

    return shrink
}
