import mongoose from "mongoose";

const mongoOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 30000,
  connectTimeoutMS: 10000,
  heartbeatFrequencyMS: 10000,
};

const mongoURI = "mongodb+srv://akuwudikealvin_db_user:buddyapp@buddy.9ywctr9.mongodb.net/?appName=Buddy";

export const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");

    const conn = await mongoose.connect(mongoURI, mongoOptions);

    console.log(`MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed due to app termination");
      process.exit(0);
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// connectDB();

export default mongoose;
