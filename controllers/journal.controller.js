import journalService from '../services/journal.service.js';

export class JournalController {
  // POST /todos
  async addJournal(req, res) {
    try {
      const userId = req.user?.id;
      const { content } = req.body;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
      }

      const journal = await journalService.addJournal({ userId, content });

      res.status(201).json({
        success: true,
        message: 'Task added successfully',
        data: journal,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }


    // GET /todos
    async getAllJournals(req, res) {
        try {
            const userId = req.user?.id;

            if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
            }

            const todos = await journalService.getAllJournals({ userId });

            res.status(200).json({
            success: true,
            data: todos,
            });
        } catch (error) {
            res.status(500).json({
            success: false,
            message: error.message,
            });
        }
    }
}

export default new JournalController();
