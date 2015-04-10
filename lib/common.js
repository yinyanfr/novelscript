/**
 * Created by Ian on 2015/4/10.
 *
 * part common
 */

function toHtml(n) {
    if (n.slice(-3) == "jpg" || n.slice(-3) == "png") {
        return "<img src=" + n + " />"
    }
    else {
        return n;
    }
}