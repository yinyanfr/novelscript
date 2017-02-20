/**
 * Created by yan on 2017/2/20.
 */

/**
 * 以剧本和台词位置为索引，储存条件的对象
 * @type {{}}
 */
ns.conditionStack = {};

/**
 * 为台词预注册条件
 * @param script
 * @param position
 * @param cond
 */
ns.condition = function (script, position, cond) {
    var cs = ns.conditionStack;
    if(!cs[script]){
        cs[script] = [];
        cs[script][position] = cond
    }else cs[script][position] = cond
};

/**
 * 台词进行前，通过此函数获得该台词的条件
 * @param script
 * @param position
 */
ns.readyBefore = function (script, position) {
    var dp = ns.dp;
    var state = ns.state.state;
    var cs = ns.conditionStack;
    if(cs[script] && cs[script][position]){
        dp.get(script, position).condition = {};
        dp.get(script, position).condition.before = ns.conditionStack[script][position](state, dp).before
    }
};

ns.readyAfter = function (script, position) {
    var dp = ns.dp;
    var state = ns.state.state;
    var cs = ns.conditionStack;
    if(cs[script] && cs[script][position]){
        dp.get(script, position).condition.after = ns.conditionStack[script][position](state, dp).after
    }
};

/**
 * condition 是一个包含两个属性的对象，包含的属性是before和after
 * before储存一个布尔值，before不存在或该值为真时，这句台词会出现，反之则会自动跳过
 * 需要注意的是，如果从其他位置跳跃到本句时，若不符合条件，将会改为下一句
 * after返回一个数组[章节，台词位置]，此时本句结束之后将会跳转至相应的章节和台词
 * 如果after不存在，本句结束后将会自然进行下一句
 * 如果after存在且为false，本句结束后游戏结束
 * 如果condition不存在，本句会播放并且结束后进行下一句
 * 以下方代码为例，如果通关次数大于0，本句会出现且连雨遥的好感度+2（请善用函数式语言）
 * 本句结束时，如果连雨遥的好感度大于5，则会跳转到ch2章节的首句，反之游戏结束
ns.condition("intro", 4, function (state) {
    return {
        before: (function () {
            if(state.round > 0){
                state.dearness["连雨遥"] += 2;
                return true
            }
            return false
        })(),
        after: (function () {
            if(state.dearness["连雨遥"] > 5){
                return ["ch2", 0]
            }else {
                return false
            }
        })()
    }
});*/
