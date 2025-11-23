import authService from '../services/auth.service.js';

export class AuthController {
  // POST /auth/register
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validation
      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          message: 'Please provide name, email, and password',
        });
        return;
      }

      const { user, token } = await authService.register({ name, email, password });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: { user, token },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || 'Registration failed',
      });
    }
  }

  // POST /auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Please provide email and password',
        });
        return;
      }

      const { user, token } = await authService.login({ email, password });

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: { user, token },
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message || 'Login failed',
      });
    }
  }

  // GET /auth/me
  async getMe(req, res) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Not authenticated',
        });
        return;
      }

      const user = await authService.getUserById(userId);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch user',
      });
    }
  }
}

export default new AuthController();
