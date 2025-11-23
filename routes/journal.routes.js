import express from 'express';
import journalController from '../controllers/journal.controller.js';
import { authMiddleware } from '../config/auth.config.js';

const router = express.Router();

// Add Journal Entry
router.post('/journal', authMiddleware, journalController.addJournal.bind(journalController));

// Get All Journal Entries
router.get('/journals', authMiddleware, journalController.getAllJournals.bind(journalController));

export default router;
