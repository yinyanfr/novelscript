/**
 * Created by yan on 2017/4/13.
 */

ns.sidebar = function (options) {
    options = options || [];
    var $sidebar = $("<div></div>");
    var theme = ns.controls.theme;
    $sidebar.css(theme.sidebarStyle);
    var i = 0;
    for(i; i < options.length; i++){
        $sidebar.append(options[i].css(theme.sidebarButtonStyle))
    }

    return $sidebar
};