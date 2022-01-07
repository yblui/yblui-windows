for (var x of document.querySelectorAll(".y-close")) {
    eventListenerClose(x);
}

function eventListenerClose(m) {
    m.addEventListener("click", function () {
        m.parentNode.parentNode.parentNode.removeChild(m.parentNode.parentNode);
    });
}
