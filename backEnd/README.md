# WasteShark Backend

A Node.js backend server for the WasteShark project, providing HTTP APIs and MQTT communication for autonomous waste collection robots.

## Features

- **Express.js HTTP Server** - RESTful API endpoints
- **MQTT Integration** - Real-time communication with robots
- **MongoDB Database** - Data persistence with Mongoose ODM
- **User Authentication** - Secure login/signup system
- **Docker Support** - Containerized deployment with Docker Compose
- **Modular Architecture** - Dynamic route loading and MQTT endpoint management

## Tech Stack

- **Runtime**: Node.js
- **Web Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose ODM v8.19.2
- **Message Broker**: Eclipse Mosquitto (MQTT v5.14.1)
- **Authentication**: bcrypt v6.0.0
- **Containerization**: Docker & Docker Compose

## Project Structure

```
backEnd/
├── api/
│   ├── http/           # HTTP API endpoints
│   │   └── users/      # User-related endpoints
│   └── mqtt/           # MQTT message handlers
├── middleware/         # Custom middleware
│   └── authCookie.js   # Authentication middleware
├── schemas/            # MongoDB schemas
│   ├── Robot.js        # Robot data model
│   └── User.js         # User data model
├── test/               # Test files
├── mongo-data/         # MongoDB data directory
├── mosquitto_passwd/   # MQTT password files
├── server.js           # Main application entry point
├── compose.yaml        # Docker Compose configuration
├── Dockerfile          # Docker image configuration
├── mosquitto.conf      # MQTT broker configuration
└── package.json        # Node.js dependencies
```

## Prerequisites

- Docker and Docker Compose
- Node.js (if running locally)
- npm (if running locally)

## Quick Start

### Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WasteShark-Repository/backEnd
   ```

2. **Configure environment variables**
   ```
   create a .env file
   # Edit .env with your configuration
   ```

3. **Start the services**
   ```bash
   docker-compose up -d
   ```

4. **Verify the services**
   ```bash
   # Check if services are running
   docker-compose ps
   
   # View logs
   docker-compose logs -f
   ```

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start MongoDB and MQTT broker**
   ```bash
   docker-compose up mongo mosquitto-broker -d
   ```

3. **Start the application**
   ```bash
   node server.js
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
# MongoDB Configuration
MONGODB_USERNAME=root
MONGODB_PASSWORD=your_mongo_password

# MQTT Configuration  
MQTT_USERNAME=your_mqtt_username
MQTT_PASSWORD=your_mqtt_password

# Server Configuration
HTTP_PORT=3000
MQTT_PORT=1883
```

## API Endpoints

### Authentication
- `POST /api/users/signup` - Create new user account
- `POST /api/users/login` - User login

### Robots
- Robot endpoints are dynamically loaded from the `/api/http` directory

## MQTT Topics

MQTT endpoints are automatically discovered and registered from the `/api/mqtt` directory. Each MQTT module should export:

```javascript
module.exports = {
    path: "robot/status",  // MQTT topic
    run: (data) => {       // Message handler
        // Handle incoming MQTT message
    }
}
```

## Database Models

### Robot Schema
```javascript
{
    name: String,
    status: String,
    duration: Number,
    // Additional robot properties
}
```

### User Schema
```javascript
{
    // User authentication and profile data
}
```

## Docker Services

### MongoDB
- **Image**: `mongo`
- **Port**: `27017`
- **Data**: Persisted in `./mongo-data`

### MQTT Broker (Mosquitto)
- **Image**: `eclipse-mosquitto`
- **Port**: `1883`
- **Authentication**: Required (configured via environment variables)

### Backend API
- **Port**: `3000`
- **Dependencies**: MongoDB, MQTT Broker

## Development

### Adding HTTP Endpoints

1. Create a new file in `/api/http/` or subdirectory
2. Export a function that sets up routes:

```javascript
module.exports = (app) => {
    app.get('/api/your-endpoint', (req, res) => {
        res.json({ message: 'Hello World' });
    });
};
```

### Adding MQTT Handlers

1. Create a new file in `/api/mqtt/`
2. Export path and handler:

```javascript
module.exports = {
    path: "your/mqtt/topic",
    run: (data) => {
        console.log('Received:', data);
    }
};
```

## Testing

Run the test suite:
```bash
npm test
```

Test specific endpoints:
```bash
node test/testStreamBotState.js
```

## Monitoring

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f mongo
docker-compose logs -f mosquitto-broker
```

### Health Checks
- **HTTP API**: `http://localhost:3000/`
- **MongoDB**: Connection status logged on startup
- **MQTT**: Connection status logged on startup

## Troubleshooting

### Common Issues

1. **MQTT Connection Failed**
   - Verify MQTT credentials in `.env`
   - Check if Mosquitto broker is running
   - Ensure MQTT port (1883) is not blocked

2. **MongoDB Connection Failed**
   - Verify MongoDB credentials in `.env`
   - Check if MongoDB container is running
   - Ensure MongoDB port (27017) is available

3. **Port Already in Use**
   - Change ports in `.env` and `compose.yaml`
   - Kill processes using the ports: `sudo lsof -i :3000`

### Reset Database
```bash
docker-compose down -v
docker-compose up -d
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License

## Support

For issues and questions, please create an issue in the repository or contact the development team.