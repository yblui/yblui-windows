function addWindow() {
    createWindow({
        id: "myWindow",
        title: "myWindow",
        menu: ["Item 1", "Item 2"],
        content: [{
            for: "Item 1",
            container: [
                {
                    element: "h1",
                    text: "Item 1"
                }, {
                    element: "p",
                    text: "My Window."
                }
            ],
            sidebar: [
                {
                    element: "h1",
                    text: "My Sidebar"
                }, {
                    element: "p",
                    text: "Lorem ipsum dolor sit amet, consetetur adipiscing elit."
                }
            ]
        }, {
            for: "Item 2",
            container: {
                element: "p",
                text: "Nothing here"
            },
            sidebar: {
                element: "p",
                text: "Nothing here"
            }
        }]
    })
}