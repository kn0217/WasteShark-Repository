const express = require("express")
const mqtt = require("mqtt")
const cookieParser = require("cookie-parser")
const fs = require("fs")
const mongoose = require("mongoose")
const uuid = require("uuid")
const bcrypt = require("bcrypt")
const app = express()

const mqttEndpoints = {}

require('dotenv').config()

function loadApiRoutes(mqttClient) {
	app.use(express.json())
	app.use(cookieParser())

	app.get("/", (req, res) => {
		res.send("Hello World!")
	})

	app.listen(process.env.HTTP_PORT, () => {
		console.log(`Example app listening on port ${process.env.HTTP_PORT}`)
	})

	loadRoutesRecursively("./api/http", app, mqttClient)
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
	await mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@localhost:27017/Project?authSource=admin`)

	console.log("Mongoose connected")
}

async function loadDefaultDatabase() {
	const Robot = require(process.cwd() + "/schemas/Robot.js")
	const User = require(process.cwd() + "/schemas/User.js")

	if (await User.exists({ email: "henry.pham@sjsu.edu" })) {
		return
	}

	const user_id = uuid.v4()
	const robot_id = "this_is_a_robot_id"

	await User.create({
		user_id: user_id,
		first_name: "Henry",
		last_name: "Pham",
		email: "henry.pham@sjsu.edu",
		password: await bcrypt.hash("chicken nuggies", 10)
	})

	await Robot.create({
		robot_id: robot_id,
		owned_by_user_id: user_id,
		name: "Cutie Pututie",
		status: "off"
	})
}

async function setupMQTT() {
	const client = mqtt.connect(`mqtt://127.0.0.1:${process.env.MQTT_PORT}`, {
		username: process.env.MQTT_USERNAME,
		password: process.env.MQTT_PASSWORD
	})

	//No need to verify authentication because it is needed to connect to the broker from both ends
	await new Promise((resolve, reject) => {
		client.on("connect", function () {
			console.log("MQTT connected")
			
			setupMQTTEndpoints("./api/mqtt", client)
			resolve()
		})
		
		client.on("error", (err) => {
			reject(err)
		})
	})

	client.on("message", (topic, payload) => {
		// Call the appropriate endpoint function based on the topic
		if (topic in mqttEndpoints) {
			const data = JSON.parse(payload.toString())

			mqttEndpoints[topic](client, data)
		}
	});

	client.on("error", (err) => console.error("mqtt error:", err));

	return client
}

async function setup() {
	await setupMongoose()
	await loadDefaultDatabase()
	const mqttClient = await setupMQTT()
	loadApiRoutes(mqttClient)
}

setup()


