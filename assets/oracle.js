/** An oracle, pulled from the HTML. */
function Oracle(list, button) {
    this.list = list;
    this.button = button;

    var mx = /\s+x(\d+)/; // weight multiplier: x4 (for instance)
    this.weight = 0;
    for (var i = 0; i < this.list.length; i++) {
        var li = this.list[i];
        var ms = li.textContent.match(mx);
        if (ms) {
            li.textContent = li.textContent.replace(mx, "");
            li.weight = parseInt(ms[1]);
        } else {
            li.weight = 1;
        }
        this.weight += li.weight;
    }
}

/** Register our event handler, dealing with the vagaries of "this". */
Oracle.prototype.register = function() {
    var o = this;
    o.button.addEventListener("click", function() { o.click(); });
};

Oracle.prototype.indexByWeight = function(weight) {
    var length = this.list.length;
    for (var i = 0; i < length; i++) {
        if (weight < this.list[i].weight) {
            return i;
        }
        weight -= this.list[i].weight;
    }
};

/** A roll button was clicked, consult the oracle. */
Oracle.prototype.click = function() {
    var length = this.list.length;
    var weight = this.weight;

    // Remove all active entries.
    for (var i = 0; i < length; i++) {
        this.list[i].classList.remove("active", "near", "far");
    }

    // Roll a "die" based on the total weight of items.
    var answer = this.indexByWeight(this.weight * Math.random());
    this.list[answer].classList.add("active");
    if (this.list.length > 3) {
        this.list[(answer - 1 + length) % length].classList.add("near");
        this.list[(answer + 1) % length].classList.add("near");
    }
    // Ironsworn allows reversing the die for a fourth item.
    // But this doesn't work with super-flexible weighting.
    //this.list[length - die - 1].classList.add("far");
};

// Register all oracle data.
var os = document.getElementsByClassName("oracle");
for (var i = 0; i < os.length; i++) {
    var o = new Oracle(
        os[i].getElementsByTagName("li"),
        os[i].getElementsByClassName("roll")[0]);
    o.register();
}
