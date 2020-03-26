/** An oracle, pulled from the HTML. */
function Oracle(list, button) {
    this.list = list;
    this.button = button;
}

/** Register our event handler, dealing with the vagaries of "this". */
Oracle.prototype.register = function() {
    var o = this;
    o.button.addEventListener("click", function() { o.click(); });
};

/** A roll button was clicked, consult the oracle. */
Oracle.prototype.click = function() {
    var length = this.list.length;

    // Remove all active entries.
    for (var j = 0; j < length; j++) {
        this.list[j].classList.remove("active", "near", "far");
    }

    var die = Math.floor(length * Math.random());
    this.list[die].classList.add("active");
    this.list[(die - 1 + length) % length].classList.add("near");
    this.list[(die + 1) % length].classList.add("near");
    this.list[length - die - 1].classList.add("far");
};

// Register all oracle data.
var os = document.getElementsByClassName("oracle");
for (var i = 0; i < os.length; i++) {
    var o = new Oracle(
        os[i].getElementsByTagName("li"),
        os[i].getElementsByClassName("roll")[0]);
    o.register();
}
