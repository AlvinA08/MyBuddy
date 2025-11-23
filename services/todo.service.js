import Todo from '../db/models/Todo.js';

class TodoService {
  // Add Task
  async addTask({ userId, title }) {
    if (!title) throw new Error('Title is required');

    const todo = await Todo.create({
      userId,
      title,
    });

    return todo;
  }

  // Toggle Complete
  async toggleComplete({ userId, todoId }) {
    const todo = await Todo.findOne({ _id: todoId, userId });

    if (!todo) {
      throw new Error('Todo not found');
    }

    todo.completed = !todo.completed;
    await todo.save();

    return todo;
  }

  // Get All Tasks
  async getAllTasks({ userId }) {
    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
    return todos;
  }
}

export default new TodoService();
