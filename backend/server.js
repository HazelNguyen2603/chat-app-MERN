import dotenv from "dotenv";
import http from "http";
import app from "./app";
import connectToMongoDB from "./db/connectToMongoDB";

dotenv.config();

const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port, () => {
  connectToMongoDB();
  console.log(`server is running on ${port}`);
});
