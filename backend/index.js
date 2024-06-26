import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

mongoose
  .connect(process.env.MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// Mounting the routers
app.use("/api/user", userRoutes);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    sucess: false,
    statusCode,
    message,
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
