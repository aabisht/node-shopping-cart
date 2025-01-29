import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Generate token for user
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// User Registration
export const registerUser = async (request, response) => {
  try {
    const { username, email, password } = request.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(400).json({ message: "User already exixt." });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    response.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error in registerUser:", error);
    response.status(500).json({ message: "Internal Server Error", error });
  }
};

// User Login
export const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return response
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    response.json({ message: "Login Successful", token });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};
