import dotenv from "dotenv";
dotenv.config();

const config = {
  mongo_url: process.env.MONGO_DB_URI,
  port: process.env.PORT,
};

export default config;