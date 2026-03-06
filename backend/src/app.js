import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "../src/controllers/socketManager.js";
import userRoutes from "./routes/users.route.js"; 

const app = express();
const server = createServer(app);

// Socket connection
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);

// Middleware
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }))

// Routes
app.use("/api/users", userRoutes);

const start = async () => {
  try {
    const connectionDB = await mongoose.connect(
      "mongodb+srv://kawadkarmuskan4_db_user:Lr7M1hSNsKE2ejhY@cluster0.nthvoyq.mongodb.net/?appName=Cluster0"
    );

    console.log(`Mongoose connected: ${connectionDB.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`Server running on port ${app.get("port")}`);
    });

  } catch (error) {
    console.log("Database connection error:", error);
  }
};

start();