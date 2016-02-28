/**
 * Created by Ian on 2016/2/28.
 */

ns.slide = function () {
    var slide = {};
    var stack = ns.state.stack;
    var state = ns.state.state;
    var stage = ns.stage;
    slide.speaker = function () {
        stage.$speaker.html(stack.speaker)
    };
    slide.dial = function () {
        stage.$dial.html(stack.dialogue)
    };
    /**
     * update the displat of a slide
     */
    slide.repaint = function () {

    }
};

ns.slides = {};