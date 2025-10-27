const method = "post"

async function setupEndPoint(app, route) {
	app.post("/api/users/logout", async function(req, res) {
		try {
			// Clear the auth cookie
			res.clearCookie("authToken", {
				httpOnly: true,
				sameSite: "strict",
				secure: process.env.NODE_ENV === "production", // set to true if using HTTPS
				path: "/", // must match cookie path used on login
			})
			return res.send({ message: "Logged out successfully" })
		} catch (error) {
			console.error("Logout error:", error)
			return res.status(500).send({ error: "Server error during logout" })
		}
	})
}

module.exports = setupEndPoint
