require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())


const posts = [
    {
        username: "User1",
        title: "Post 1"
    },
    {
        username: "User2",
        title: "Post 2"
    },
]

app.get('/posts', (req, res) => {
    res.json(posts)
})

app.post('/login', (req, res) => {
    //Authenticate user
    const username = req.body.username;
    const user = { name: username }
    const accessToken = jwt.sign(user, process.env.SECRET_KEY)
    res.json({ accessToken: accessToken })
})

app.listen(3000)
