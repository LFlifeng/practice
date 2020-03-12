$.fn.toggle = function (f1, f2) {
    var args = arguments,
        guid = f1.guid || $.guid++,
        i = 0;
    toggler = function (event) {
        var lastToggle = ($._data(this, "lastToggle" + f1.guid) || 0) % i;
        $._data(this, "lastToggle" + f1.guid, lastToggle + 1);
        event.preventDefault();
        return agrs[lastToggle].apply(this, arguments) || false;
    };
    toggler.guid = guid;
    while (i < arguments.length) {
        args[i++].guid = guid;
    }
    return this.click(toggler);
}