require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./database/mongodb");

const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redis = require("redis");

// Import routes
const userRoutes = require("./routes/users");
const doctorRoutes = require("./routes/doctors");
const appointmentRoutes = require("./routes/appointments");

let redisClient = redis.createClient({
  host: process.env.REDIS_HOST, // Redis host
  port: process.env.REDIS_PORT, // Redis port
  password: process.env.REDIS_PASSWORD, // Redis password if required
  enable_offline_queue: false,
  legacyMode: true,
});

redisClient.on("error", function (err) {
  console.log("Could not establish a connection with Redis. ", err);
});

redisClient.on("connect", function () {
  console.log("Connected to Redis successfully");
});

const app = express();

// Use express-session middleware with Redis store
app.use(
  session({
    store: new RedisStore({client: redisClient}),
    secret: process.env.SESSION_SECRET, // Use an environment variable for the secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Use secure cookies in production
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "*",
    credentials: true,
  })
);

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Online Appointment System API');
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route does not exist.");
});

const server = app.listen(process.env.PORT || 3001, async () => {
  console.log(`Server is running on url - http://localhost:${server.address().port}`);
  await connectDB();
});
