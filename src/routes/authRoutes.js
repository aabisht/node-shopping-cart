import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected", authMiddleware, (request, response) => {
  response.json({ message: "This is a protected route!", user: request.user });
});

export default router;
