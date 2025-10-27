
const jwt = require('jsonwebtoken')

async function setupEndPoint(app, route) {
    app.post("/api/users/refresh", async function(req, res) {
        try {
            // Check if refresh token cookie exists
            const refreshToken = req.cookies.jwt
            if (!refreshToken) {
                return res.status(401).send({ 
                    error: "Unauthorized",
                    message: "No refresh token provided" 
                })
            }

            // Verify the refresh token
            try {
                const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
                
                // Generate new access token
                const accessToken = jwt.sign(
                    { 
                        id: user._id.toString(),
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '15m' }
                )

                return res.send({ 
                    success: true,
                    token: accessToken,
                    message: "Access token refreshed successfully"
                })

            } catch (verifyError) {
                // Token verification failed
                res.clearCookie('jwt', {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Lax'
                })
                
                return res.status(401).send({ 
                    error: "Unauthorized",
                    message: "Invalid refresh token"
                })
            }

        } catch (error) {
            console.error("Refresh token error:", error)
            return res.status(500).send({ 
                error: "Internal Server Error",
                message: "Error processing refresh token"
            })
        }
    })
}

module.exports = setupEndPoint
