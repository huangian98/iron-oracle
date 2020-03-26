/* Oracle-ize the lists. */

var os = document.getElementsByClassName("oracle");
for (var i = 0; i < os.length; i++) {
    // Implement the button.
    var t = os[i].getElementsByTagName("li");
    var button = os[i].getElementsByClassName("roll")[0];
    button.addEventListener("click", () => {
        // Remove all active entries.
        for (var j = 0; j < t.length; j++) {
            t[j].classList.remove("active", "near", "far");
        }

        var die = Math.floor(t.length * Math.random());
        t[die].classList.add("active");
        t[(die - 1 + t.length) % t.length].classList.add("near");
        t[(die + 1) % t.length].classList.add("near");
        t[t.length - die - 1].classList.add("far");
    });
}
