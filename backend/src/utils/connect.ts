import mongoose from "mongoose";
import logger from "./logger";
import config from "config";
import * as redis from "redis";

const client = redis.createClient();

mongoose.set("strictQuery", false);
const connectToDB = async () => {
  try {
    await mongoose.connect(config.get<string>("DBURI"));
    logger.info("Connection to database successful");
  } catch (error: any) {
    logger.error(error.message);
  }
};

const connectToRedis = async () => {
  try {
    await client.connect();
    client.on("connect", () => {
      logger.info("Redis connected...");
    });
  } catch (error: any) {
    logger.error("Redis Error:", error.message);
  }
};

export { connectToDB, connectToRedis, client };
