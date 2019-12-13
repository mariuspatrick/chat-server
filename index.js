const express = require('express')
const messageRouterFactory = require('./message/router')
const bodyParser = require('body-parser')
const Sse = require('json-sse')
const Message = require('./message/model')

const app = express()

const port = 4000

const stream = new Sse()
const messageRouter = messageRouterFactory(stream)

app.get("/", (req, res) => {
	stream.send("hi")
	res.send("hello")
})

app.get("/stream", async (req, res) => {
	try {
		const messages = await Message.findAll() //get array out of db
		const string = JSON.stringify(messages) // convert array into string = "serialize" it

		stream.updateInit(string) //Preparing string to be sent to the client after they *connect*
		stream.init(req, res) // *Connect* the user to the string 
	} catch (error) {
		next(error) // handle any errors
	}
})

const jsonParser = bodyParser.json()

app.use(jsonParser)
app.use(messageRouter)

app.listen(port, () => {
	console.log(`Listening on: ${port}`)
})
