for (var x of document.querySelectorAll(".y-close")) {
    eventListenerClose(x);
}
for (var y of document.querySelectorAll(".y-max")) {
    eventListenerMax(y);
}
$(".y-windows").draggable({cancel:".y-flex",containment:"document"});

function eventListenerClose(m) {
    m.addEventListener("click", function () {
        m.parentNode.parentNode.parentNode.removeChild(m.parentNode.parentNode);
    })
}

function eventListenerMax(n) {
    n.addEventListener("click", function () {
        if (n.innerText == "Maximize") {
            n.parentNode.parentNode.style.left = "0";
            n.parentNode.parentNode.style.top = "0";
            n.parentNode.parentNode.style.width = "calc(100vw - 20px)";
            n.parentNode.parentNode.style.height = "calc(100vh - 14px)";
            n.innerText = "Resize";
        } else {
            n.parentNode.parentNode.style.left = "1vmin";
            n.parentNode.parentNode.style.top = "1vmin";
            n.parentNode.parentNode.style.width = "50vw";
            n.parentNode.parentNode.style.height = "50vh";
            n.innerText = "Maximize";
        }
    })
}
