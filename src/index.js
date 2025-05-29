const express = require("express");
const setupCluster = require("./clusterSetup");
const connectDB = require("./db");

const startServer = () => {
  const app = express();
  const authRoutes = require("./routes/authRoutes");
  const dashboard = require("./routes/dashboardRoutes");
  const authenticate = require("./middleware/authenticate");
  const session = require("express-session");
  const { secretKey } = require("./config/secrets");
  const PORT = 3000;

  // for connect the monogooes db
  connectDB();
  // end

  // middleware in Express.js is used to parse incoming requests with JSON payloads.
  app.use(express.json());
  // end

  // for session express
  app.use(
    session({
      secret: secretKey, // Use secret key from .env
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }, // Expire session after set time
    })
  );
  // end

  // all routes of auth
  app.use("/auth", authRoutes);
  app.use("/api", authenticate, dashboard);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
// Initialize clustering
// setupCluster(startServer);
