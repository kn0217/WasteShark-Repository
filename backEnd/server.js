const express = require("express")
const mqtt = require("mqtt")
const fs = require("fs")
const app = express()
const port = 3000

const mqttEndpoints = {}

require('dotenv').config()

function loadApiRoutes() {
	app.use(express.json())

	app.get("/", (req, res) => {
		res.send("Hello World!")
	})

	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	})

	loadRoutesRecursively("./api/http", app)
}

// Runs every endpoint module to set them up
function loadRoutesRecursively(path, ...parameters) {
	const items = fs.readdirSync(path)

	for (const item of items) {
		const itemPath = `${path}/${item}`
		const file = fs.statSync(itemPath)

		if (file.isDirectory()) {
			loadRoutesRecursively(itemPath, ...parameters)
		} else if (file.isFile()) {
			const endPointModule = require(itemPath)

			endPointModule(...parameters)
		}
	}		
}

// Puts all MQTT endpoint modules into a dictionary to be called later
function setupMQTTEndpoints(path, client) {
	const items = fs.readdirSync(path)

	for (const item of items) {
		const itemPath = `${path}/${item}`
		const file = fs.statSync(itemPath)

		if (file.isDirectory()) {
			loadRoutesRecursively(itemPath, ...parameters)
		} else if (file.isFile()) {
			const endPointModule = require(itemPath)

			mqttEndpoints[endPointModule.path] = endPointModule.run

			client.subscribe(endPointModule.path)
		}
	}
}

async function setupMongoose() {
	const mongoose = require("mongoose")
	await mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@localhost:27017/Project?authSource=admin`)

	console.log("Mongoose connected")
}

async function setup() {
	await setupMongoose()
	loadApiRoutes()

	const client = mqtt.connect("mqtt://127.0.0.1:1883", {
		username: process.env.MQTT_USERNAME,
		password: process.env.MQTT_PASSWORD
	})

	//No need to verify authentication because it is needed to connect to the broker from both ends
	client.on("connect", function () {
		console.log("MQTT connected")
		
		setupMQTTEndpoints("./api/mqtt", client)
	})

	client.on("message", (topic, payload) => {
		console.log("msg", topic, payload.toString());

		if (topic in mqttEndpoints) {
			const data = JSON.parse(payload.toString())

			mqttEndpoints[topic](data)
		}
	});

	client.on("error", (err) => console.error("mqtt error:", err));
}

setup()


