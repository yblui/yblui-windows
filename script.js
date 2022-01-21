function addWindow() {
    createWindow({
        id: "myWindow",
        title: "myWindow",
        menu: ["Item 1", "Item 2"],
        content: [{
            for: "Item 1",
            container: [
                {
                    type: "heading",
                    text: "Item 1"
                }, {
                    type: "paragraph",
                    text: "My Window."
                }
            ],
            sidebar: [
                {
                    type: "heading",
                    text: "My Sidebar"
                }, {
                    type: "paragraph",
                    text: "Lorem ipsum dolor sit amet, consetetur adipiscing elit."
                }
            ]
        }, {
            for: "Item 2",
            container: [
                {
                    type: "paragraph",
                    text: "Nothing here"
                }
            ],
            sidebar: [
                {
                    type: "paragraph",
                    text: "Nothing here"
                }
            ]
        }]
    })
}