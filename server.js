const express = require("express")
const app = express();
const posts = [
    {
        username: "User 1",
        title: "Post 1"
    },
    {
        username: "User 2",
        title: "Post 2"
    },
]

app.get('/posts', (req, res) => {
res.json(posts)
})

app.listen(3000)
