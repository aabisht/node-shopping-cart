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
    const { firstName, lastName, username, email, password } = request.body;

    if (!username)
      return response.status(400).json({ message: "Username is required." });
    if (!email)
      return response.status(400).json({ message: "User email is required." });
    if (!password)
      return response
        .status(400)
        .json({ message: "User password is required." });

    const existingUsername = await User.findOne({ username });
    const existingUserEmail = await User.findOne({ email });

    if (existingUsername || existingUserEmail)
      return response.status(400).json({ message: "User already exixt." });

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    await newUser.save();
    response.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};

// User Login
export const loginUser = async (request, response) => {
  try {
    const { username, password } = request.body;

    if (!username)
      return response.status(400).json({ message: "Username is required." });
    if (!password)
      return response
        .status(400)
        .json({ message: "User password is required." });

    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return response
        .status(401)
        .json({ message: "Invalid username or password" });
    }

    const token = generateToken(user);

    response.json({ message: "Login Successful", token });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};
