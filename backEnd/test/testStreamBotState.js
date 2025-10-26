const axios = require("axios");

async function testStreamBotState() {
  console.log("Testing GET /api/robots/streamBotState ...");
  try {
    const response = await axios.get("http://localhost:3000/api/robots/streamBotState", {
      responseType: "stream",
      timeout: 0, // disable timeout for continuous stream
    });

    // Listen to incoming data chunks
    response.data.on("data", chunk => {
      console.log("Received chunk:", chunk.toString());
    });

    response.data.on("end", () => {
      console.log("Stream ended");
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testStreamBotState();