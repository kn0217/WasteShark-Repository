const Robot = require(process.cwd() + "/schemas/Robot.js")

async function setupEndPoint(app, mqttClient) {
	app.post("/api/robots/new", async function(req, res) {
		try {
			await Robot.updateOne({
				robot_id: req.body.robotId
			},
			{
				$set: {
					owned_by_user_id: req.body.userId
				}
			})
		} catch (error) {
			console.error("Error updating robot status in database:", error)

			res.status(500).send({
				error: "Internal server error"
			})
			
			return
		}

		res.send({
			success: true
		})
	})
}

module.exports = setupEndPoint