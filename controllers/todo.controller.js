import todoService from '../services/todo.service.js';

export class TodoController {
  // POST /todos
  async addTask(req, res) {
    try {
      const userId = req.user?.id;
      const { title } = req.body;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
      }

      const todo = await todoService.addTask({ userId, title });

      res.status(201).json({
        success: true,
        message: 'Task added successfully',
        data: todo,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PATCH /todos/:id/toggle
  async toggleComplete(req, res) {
    try {
      const userId = req.user?.id;
      const todoId = req.params.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
      }

      const todo = await todoService.toggleComplete({ userId, todoId });

      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: todo,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

    // GET /todos
    async getAllTasks(req, res) {
        try {
            const userId = req.user?.id;

            if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
            }

            const todos = await todoService.getAllTasks({ userId });

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

export default new TodoController();
