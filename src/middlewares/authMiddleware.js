import jwt from "jsonwebtoken";

const authMiddleware = (request, response, next) => {
  // Expect "Bearer <token>"
  const token = request.header("Authorization")?.split(" ")[1];

  if (!token) {
    return response
      .status(401)
      .json({ message: "Access denied. No token is provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    return response
      .status(403)
      .json({ message: "Invalid or expired token.", error });
  }
};

export default authMiddleware;
