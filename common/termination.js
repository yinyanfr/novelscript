/**
 * Created by yan on 2017/2/20.
 */

ns.termination = function () {
    ns.$deferred.resolve();
    console.log("Immediate termination has been applied.")
};