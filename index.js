const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const router = require('./routes/Routes.js')
const quotes = require('./models/middleware.js')

require('dotenv').config()

const port = process.env.Port || 8000
const logger = (req, res, next) => {
    console.log(quotes[Math.floor(Math.random()*4)])
    next()
}

app.use(logger)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/v1/games', router)


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})