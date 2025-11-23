import express from "express";
import Affirmation from "../db/models/Affirmation.js";
import Quote from "../db/models/Quote.js";

const router = express.Router();

// -------------------- AFFIRMATIONS --------------------

// Get a random affirmation
router.get("/affirmations/random", async (req, res) => {
  try {
    const count = await Affirmation.countDocuments();
    const random = Math.floor(Math.random() * count);
    const affirmation = await Affirmation.findOne().skip(random);
    
    res.json(affirmation);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch affirmation" });
  }
});

// Get all affirmations
router.get("/affirmations", async (req, res) => {
  try {
    const affirmations = await Affirmation.find();
    res.json(affirmations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch affirmations" });
  }
});


// -------------------- QUOTES --------------------

// Get a random quote
router.get("/quotes/random", async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne().skip(random);
    
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

// Get all quotes
router.get("/quotes", async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

// -------------------- HEALTH CHECK --------------------

router.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

export default router;