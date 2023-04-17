import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

config({
  path: "./config/config.env",
});

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const app = express();

// Using Middlewares
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: "100mb",
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//importing and using Routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import other from "./routes/otherRoutes.js";

app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

export default app;

app.get("/", (req, res) => {
  res.send(
    `<h1>Site is working. Click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  );
});

app.use(ErrorMiddleware);
