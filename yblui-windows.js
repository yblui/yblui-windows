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

function compile(jsonObject) {
    if (Array.isArray(jsonObject)) {
        var txt = "";
        for (var f of jsonObject) txt += compile(f);
        return txt;
    } else if (typeof jsonObject == "object") {
        var v = "<" + jsonObject.element;
        if (jsonObject.element == "h1") v += " class='y-head'";
        if (jsonObject.element == "h2") v += " class='y-head2'";
        if (jsonObject.element == "h3") v += " class='y-head3'";
        for (var g in jsonObject) {
            if (g != "element" && g != "text") v += " " + g + "='" + jsonObject[g] + "'";
        }
        v += ">" + compile(jsonObject.text) + "</" + jsonObject.element + ">";
        return v;
    }
    return jsonObject;
}

function createWindow(cw) {
    var menuText = "", contentText = "";
    for (var g in cw.menu) {
        if (g == 0) {
            menuText += '<p class="y-item y-select" onclick="select(this);">' + cw.menu[g] + '</p>';
        } else {
            menuText += '<p class="y-item" onclick="select(this);">' + cw.menu[g] + '</p>';
        }
    }
    for (var v of cw.content) {
        contentText += '<div class="y-container" data-for="' + v.for + '"><div class="y-main">' + compile(v.container) + '</div>' +
            '<div class="y-sidebar">' + compile(v.sidebar) + '</div></div>'
    }
    document.getElementsByTagName("body")[0].innerHTML += '<div class="y-windows" id="' + cw.id + '" onclick="yfocus(this);">' +
        '<span class="y-title" ondblclick="max(this.parentNode);">' + cw.title + '</span><div class="y-buttons">' +
        '<span class="y-max" onclick="max(this.parentNode.parentNode);">Maximize</span><span class="y-close" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);">Close</span></div><div class="y-flex"><div class="y-menu">' +
        '<p class="y-item">Homepage</p><input type="text" class="y-search" placeholder="Search..." />' +
        '<p class="y-mtitle">Menu</p>' + menuText + '</div>' + contentText + '</div></div>';
    $(".y-windows").draggable({
        cancel: ".y-flex",
        containment: "document",
        distance: 10
    });
}