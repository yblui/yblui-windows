for (var x of document.querySelectorAll(".y-close")) {
    eventListenerClose(x);
}
for (var y of document.querySelectorAll(".y-max")) {
    eventListenerMax(y);
}
for (var w of document.querySelectorAll(".y-windows")) {
    eventListenerFocus(w);
}
for (var k of document.querySelectorAll(".y-range")) {
    eventListenerRange(k);
    rangeChange(k);
}
$(".y-windows").draggable({
    cancel: ".y-flex",
    containment: "document",
    distance: 10
});
var z = 10000;

function eventListenerClose(m) {
    m.addEventListener("click", function () {
        m.parentNode.parentNode.parentNode.removeChild(m.parentNode.parentNode);
    })
}

function eventListenerMax(n) {
    n.addEventListener("click", function () {
        max(n.parentNode.parentNode);
    })
}

function eventListenerFocus(r) {
    r.addEventListener("click", function () {
        yfocus(r);
    })
}

function eventListenerRange(l) {
    l.addEventListener("input", function () {
        rangeChange(l);
    })
}

function select(element) {
    for (var a of element.parentNode.getElementsByClassName("y-item")) {
        a.classList.remove("y-select");
    }
    element.classList.add("y-select");
    for (var o of element.parentNode.parentNode.getElementsByClassName("y-container")) {
        o.style.display = "none";
        if (o.dataset.for == element.innerText) {
            o.style.display = "block";
        }
    }
}

function max(q) {
    if (q.getElementsByClassName("y-max")[0].innerText == "Maximize") {
        q.style.left = "0";
        q.style.top = "0";
        q.style.width = "calc(100vw - 20px)";
        q.style.height = "calc(100vh - 14px)";
        q.getElementsByClassName("y-max")[0].innerText = "Resize";
    } else {
        q.style.left = "1vmin";
        q.style.top = "1vmin";
        q.style.width = "50vw";
        q.style.height = "50vh";
        q.getElementsByClassName("y-max")[0].innerText = "Maximize";
    }
}

function yfocus(focusElm) {
    z += 100;
    focusElm.style.zIndex = z;
}

function rangeChange(rangeElm) {
    var arr = [], u = 0;
    for (var t of document.getElementsByClassName("y-range")) {
        arr[u] = t;
        u++;
    }
    var percentage = (Number(rangeElm.value) - Number(rangeElm.min)) / (Number(rangeElm.max) - Number(rangeElm.min)) * 100;
    document.querySelector(".y-range:nth-of-type(" + (arr.indexOf(rangeElm) + 1) + ")").style.backgroundImage =
        "linear-gradient(90deg, rgb(6, 83, 120) 0%, rgb(6, 83, 120) " + percentage + "%, lightgray " + percentage + "%)";
}