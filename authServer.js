require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

//replicating DB
let refreshTokenStorage = [];

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken === null) return res.sendStatus(401)
    if (!refreshTokenStorage.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

app.post('/login', (req, res) => {
    //Authenticate user assuming user valid
    const username = req.body.username;
    const user = { name: username }
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.SECRET_KEY)
    refreshTokenStorage.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

app.delete('/logout',(req,res)=>
{
    refreshTokenStorage=refreshTokenStorage.filter(token=>token!==req.body.token)
    res.sendStatus(204)
})


function generateAccessToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '15s' })
}
app.listen(4000)

