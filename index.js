const express = require('express')
const messageRouter = require('./message/router')
const bodyParser = require('body-parser')

const app = express()

const port = 4000

app.get("/", (req, res) => {
	res.send("Hello")
})

const jsonParser = bodyParser.json()

app.use(jsonParser)
app.use(messageRouter)

app.listen(port, () => {
	console.log(`Listening on: ${port}`)
})
