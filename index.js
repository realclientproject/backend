import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import connectDB from "./config/db.js";
import UserRouter from "./routes/user_route.js";
import SubscriptionRouter from "./routes/subscription_route.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = new express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer().array());
app.use(cors());
app.use("/user", UserRouter);
app.use("/Subscription", SubscriptionRouter);

app.get("/", (req, res) => {
  res.send("api is running");
});
await connectDB();

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
