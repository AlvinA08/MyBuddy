import express from "express";
import routes from "./routes/index.js";
import { connectDB } from "./db/client.js";

import Affirmation from "./models/Affirmation.js";
import Quote from "./models/Quote.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

// -------------------- SEED DATA --------------------
const affirmations = [
  "I am capable of achieving my goals.",
  "I believe in myself and my abilities.",
  "I grow stronger every day.",
  "I am worthy of good things.",
  "Success is coming to me.",
  "I am confident and fearless.",
  "I choose peace and positivity.",
  "I am improving in every way.",
  "I trust my journey and timing.",
  "I am proud of the person I am becoming.",
  "My potential is limitless.",
  "I deserve happiness and success.",
  "I learn and grow from every challenge.",
  "I attract good opportunities.",
  "I am focused, disciplined, and motivated.",
  "My hard work will pay off.",
  "I am grateful for today.",
  "I release doubt and welcome confidence.",
  "Everything I need is already within me.",
  "I am becoming my best self.",
];

const quotes = [
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Success is not final; failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" },
  { text: "Don’t stop when you’re tired. Stop when you’re done.", author: "Unknown" },
  { text: "Dream big and dare to fail.", author: "Norman Vincent Peale" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  { text: "The best way to predict the future is to create it.", author: "Abraham Lincoln" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Little by little, a little becomes a lot.", author: "African Proverb" },
  { text: "Your only limit is your mind.", author: "Unknown" },
];

// -------------------- SEED FUNCTION --------------------
async function seedIfNeeded() {
  const affirmationCount = await Affirmation.countDocuments();
  const quoteCount = await Quote.countDocuments();

  if (affirmationCount === 0 && quoteCount === 0) {
    console.log("Database empty. Seeding...");

    await Affirmation.insertMany(
      affirmations.map(text => ({ text }))
    );
    await Quote.insertMany(quotes);

    console.log("Seeding complete.");
  } else {
    console.log("Database already seeded. Skipping seeding.");
  }
}

// -------------------- START SERVER --------------------
async function startServer() {
  try {
    await connectDB();

    await seedIfNeeded();  // 👈 integrated here

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
