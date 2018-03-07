const express = require("express");

const server = new express();
const port = 9000;

server.use(express.static("public"))

server.get("/api/posts", (req, res) => {
    const posts = [
        { title: "Mot so luu y" },
        { title: "Hello" },
        { title: "goodbyw" },
        { title: "nihao" }
    ];

    res.json({ success: true, posts });
})

server.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/thanggit.html")
})

server.listen(port, (req, res) => {
    console.log("Server dang chay o cong 9000");
});
