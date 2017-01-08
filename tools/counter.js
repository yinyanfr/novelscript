/**
 * Created by yan on 2017/1/8.
 */

$(document).ready(function () {
    var audio = document.getElementById("wa");
    var start = 0;
    var unit = 50;
    var n = 0;
    function counter() {
        n++;
        if(n%20 == 0) {
            // put out result of the counter every 1 second
            // so as to compare with the actual time (by the audio)
            console.log(audio.currentTime);
        }
        start+=unit;
        setTimeout(counter, unit+start-(Date.now()));
        /**
         * optimised from
         * current = Date.now();
         * tmp = current - start;
         * start+=unit;
         * setTimeout(counter, unit-(tmp-unit))
         */
    }
    $("button").click(function () {
        audio.currentTime = 0;
        start = Date.now();
        audio.play();
        setTimeout(counter, unit)
    })
});
