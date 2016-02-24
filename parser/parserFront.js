/**
 * Created by Ian on 2016/2/24.
 */

/**
 * parse script at front end
 * @param data
 * @returns {number}
 */
ns.parseScript = function (data) {
    return ns.parser(data).parse()
};