const express = require('express')
const messageRouter = require('./message/router')

const app = express()

const port = 4000

app.get("/", (req, res) => {
	res.send("Hello")
})

app.use(messageRouter)

app.listen(port, () => {
	console.log(`Listening on: ${port}`)
})
