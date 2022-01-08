for (var x of document.querySelectorAll(".y-close")) {
    eventListenerClose(x);
}
for (var y of document.querySelectorAll(".y-max")) {
    eventListenerMax(y);
}
$(".y-windows").draggable({
    cancel: ".y-flex",
    containment: "document",
    distance: 10
});

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

function select(element) {
    for (var a of element.parentNode.getElementsByClassName("y-item")) {
        a.classList.remove("y-select");
    }
    element.classList.add("y-select");
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
