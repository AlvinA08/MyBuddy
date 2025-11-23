import jwt from "jsonwebtoken";
import User from "../db/models/User.js";

class AuthService {
  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
    this.JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";
  }

  generateToken(user) {
    return jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
      },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRE }
    );
  }

  // Register new user
  async register({ name, email, password }) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const user = await User.create({ name, email, password });

    const token = this.generateToken(user);

    user.password = undefined;

    return { user, token };
  }

  // Login user
  async login({ email, password }) {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = this.generateToken(user);

    user.password = undefined;

    return { user, token };
  }

  async getUserById(id) {
    const user = await User.findById(id).select("-password");
    return user;
  }
}

export default new AuthService();
