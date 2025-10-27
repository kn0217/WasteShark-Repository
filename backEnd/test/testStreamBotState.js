// CommonJS-compatible EventSource test
const EventSource = require("eventsource");

console.log("Testing GET /api/robots/streamBotState using EventSource...");

// Connect to your backend streaming endpoint
const eventSource = new EventSource("http://localhost:3000/api/robots/streamBotState");

eventSource.onopen = () => {
  console.log("Connected to /api/robots/streamBotState");
};

eventSource.onmessage = (event) => {
  console.log("Received event:", event.data);
};

eventSource.onerror = (err) => {
  console.error("Stream error or closed:", err);
  eventSource.close();
};