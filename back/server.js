import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config.js";
import postRoutes from "./routes/posts.js";

const app = express();
const PORT = process.env.PORT || 9000;
const connect_url = config.MONGODB_URL;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

mongoose
  .connect(connect_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
});
