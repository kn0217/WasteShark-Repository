const verifyJWT = require("../../../middleware/verifyJWT")

async function setupEndPoint(app, route) {
    app.post("/api/users/securedendpoint", verifyJWT, async function(req, res) {
        try {
            res.send({
                success: true
            })
        } catch (error) {
            return res.status(500).send({ 
                error: "Internal Server Error",
            })
        }
    })
}

module.exports = setupEndPoint
