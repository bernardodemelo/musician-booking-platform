/* Packages Import */
import express, { Express } from "express";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";

/* Routes Import */
import { musicianRoutes } from "./routes/musician";
import { sessionRoutes } from "./routes/session";

// express init
const app: Express = express();

// app_url from .env
const app_url = process.env.APP_URL;

// cors
const options: CorsOptions = {
  origin: app_url,
};

app.use(cors(options));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes
app.use("/api", musicianRoutes);
app.use("/api", sessionRoutes);

export default app;