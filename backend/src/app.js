import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
connectToSocket(server);
const port = Number(process.env.PORT || 8000);
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: clientOrigin.split(","), methods: ["GET", "POST"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));
app.get("/api/v1/health", (_req, res) => res.status(200).json({ status: "ok" }));
app.use("/api/v1/users", userRoutes);
app.use((_req, res) => res.status(404).json({ message: "Route not found" }));

async function start() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI is required. Add it to your environment before starting the API.");
  await mongoose.connect(mongoUri);
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
  server.listen(port, () => console.log(`Meetly API listening on port ${port}`));
}

start().catch((error) => { console.error(error.message); process.exit(1); });
