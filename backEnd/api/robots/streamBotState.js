// api/robots/streamBotState.js
module.exports = (app, route) => {
  app.get(route, async (req, res) => {
    console.log(`Incoming GET request to ${route}`);

    // Set JSON response headers
    res.setHeader("Content-Type", "application/json");

    // Use while(true) loop to continuously send JSON responses
    // For testing only — this would normally be streaming logic.
    let count = 0;
    while (true) {
      const data = { status: "Roaming", iteration: count++ };

      // Write chunked response
      res.write(JSON.stringify(data) + "\n");

      console.log("Sent data:", data);

      // Sleep for 1 second before sending next update
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  });
};
