import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import RestServer from "./lib/RestServer/RestServer.js";
import setupRoutes from "./routes/index.js";

import accessEnv from "./helpers/accessEnv.js";

mongoose
  .connect(accessEnv("MONGO_URI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("db is connected"))
  .catch((err) => console.log(err));

const PORT = accessEnv("PORT", 3000);
const restApp = new RestServer();

setupRoutes(restApp);

restApp.server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on 0.0.0.0:${PORT}`);
});
