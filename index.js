import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import cors from "cors";
import connectDB from "./config/db.js";
import SubscriptionRouter from "./routes/subscription_route.js";
import subjectRoutes from "./routes/subject_route.js";
import resource_Routes from "./routes/resources_route.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin_route.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = new express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use(multer().array());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/user", adminRoutes);
app.use("/Subscription", SubscriptionRouter);

app.get("/", (req, res) => {
  res.send("api is running");
});
await connectDB();

app.use("/public/images", express.static("./public/images"));
app.use("/public/files", express.static("./public/files"));
app.use("/subject", subjectRoutes);
app.use("/resource", resource_Routes);

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
