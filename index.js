import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import subjectRoutes from "./routes/subject_route.js"
import resource_Routes from "./routes/resources_route.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = new express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.get("/", (req, res) => {
  res.send("api is running");
});
await connectDB();

app.use(express.urlencoded({ extended: false }));
app.use('/public/images',express.static('./public/images'))
app.use('/public/files',express.static('./public/files'))


// routes
app.use("/subject", subjectRoutes);
app.use("/resource", resource_Routes);

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
