const bcrypt = require("bcrypt")
const User = require(process.cwd() + "/schemas/User.js")

async function setupEndPoint(app) {
	app.post("/users/login", async function(req, res) {
		let user

		try {
			user = await User.findOne({ email: req.body.email })
		} catch (error) {
			console.error("Error logging into account:", error)

			return res.status(500).send({
				error: "Internal Server Error"
			})
		}

		// Check if user exists
		if (!user) {
			return res.status(401).send({
				error: "Invalid credentials"
			})
		}

		if (bcrypt.compareSync(req.body.password, user.password) === false) {
			return res.status(401).send({
				error: "Invalid credentials"
			})
		}

		// @Colin JWT stuff here ig

		res.send({
			success: true
		})
	})
}

module.exports = setupEndPoint