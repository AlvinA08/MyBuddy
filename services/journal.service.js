import Journal from '../db/models/Journals.js';

class JournalService {
  // Add Task
  async addJournal({ userId, content }) {
    if (!content) throw new Error('Content is required');

    const journal = await Journal.create({
      userId,
      content,
    });

    return journal;
  }

  // Get All journals
  async getAllJournals({ userId }) {
    const journals = await Journal.find({ userId }).sort({ createdAt: -1 });
    return journals;
  }
}

export default new JournalService();
