import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const port = process.env.PORT || 5000;

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required to start the TaskFlow API.");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("TaskFlow API failed to start:", error);
  process.exit(1);
});
