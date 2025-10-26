const Robot = require(process.cwd() + "/schemas/Robot.js")

const path = "/robot/updatestatus"

async function run(data) {
	console.log(data)	
}

module.exports = {
	run: run,
	path: path
}