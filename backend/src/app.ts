import express from "express";
import config from "config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import { connectToDB, connectToRedis } from "./utils/connect";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(errorHandler);

routes(app);

const PORT = config.get<number>("PORT");
const MODE = config.get<string>("MODE");

connectToDB();

mongoose.connection.once("open", async () => {
  await connectToRedis();
  app.listen(PORT, () => {
    logger.info(`${MODE} server is up on port ${PORT}`);
  });
});
