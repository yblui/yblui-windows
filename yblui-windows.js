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
        v += elementType(jsonObject.element);
        for (var g in jsonObject) {
            if (g != "element" && g != "text") v += " " + g + "='" + jsonObject[g] + "'";
        }
        v += ">" + compile(jsonObject.text) + "</" + jsonObject.element + ">";
        return v;
    }
    return jsonObject;
}

function elementType(u) {
    if (u == "h1") return " class='y-head'";
    if (u == "h2") return " class='y-head2'";
    if (u == "h3") return " class='y-head3'";
    else return "";
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

/*** Kitboard ***/

var ids = [
    "#aa", "#ab", "#ac", "#ad", "#ae", "#af", "#ag", "#ah", "#ai",
    "#aj", "#ak", "#one", "#two", "#three", "#four", "#five",
    "#six", "#seven", "#eight", "#nine", "#zero"
]
var valsa = [
    "~", "_", "+", "{", "}", "|", ":", "\"", "<", ">", "?", "!",
    "@", "#", "$", "%", "^", "&", "*", "(", ")"
]
var valsb = [
    "`", "-", "=", "[", "]", "\\", ";", "\'", ",", ".", "/", "1",
    "2", "3", "4", "5", "6", "7", "8", "9", "0"
]
var se, i, va,
    cap = false,
    lock = false,
    le = ids.length - 1;
function chc() {
    if (cap) {
        $(".shift").css({
            "background-color": "rgb(6, 83, 120)",
            "color": "white"
        })
        for (i = 0; i <= le; i++) {
            $(ids[i]).val(valsa[i])
        }
    } else {
        $(".shift").css({
            "background-color": "",
            "color": ""
        })
        for (i = 0; i <= le; i++) {
            $(ids[i]).val(valsb[i]);
        }
    }
    if (lock) {
        $("#cps").css({
            "background-color": "rgb(6, 83, 120)",
            "color": "white"
        })
    } else {
        $("#cps").css({
            "background-color": "",
            "color": ""
        })
    }
}

function inpo(c) {
    $("#text").val($("#text").val() + c);
}

function inpnum(u, d) {
    va = $("#text").val();
    if (cap) {
        $("#text").val(va + u);
    } else {
        $("#text").val(va + d);
    }
    cap = false;
    chc();
}

function inpletter(u, d) {
    va = $("#text").val();
    if (cap != lock) {
        $("#text").val(va + u);
    } else {
        $("#text").val(va + d);
    }
    cap = false;
    chc();
}

function cpslk() {
    lock = !lock;
    chc();
}

function shift() {
    cap = !cap;
    chc();
}

function bksp() {
    va = $("#text").val();
    $("#text").val(va.substr(0, va.length - 1));
}