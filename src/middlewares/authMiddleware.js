import jwt from "jsonwebtoken";

export const setRequestUser = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const authMiddlewareAPI = (request, response, next) => {
  // Expect "Bearer <token>"
  const token = request.header("Authorization")?.split(" ")[1];

  if (!token) {
    return response
      .status(401)
      .json({ message: "Access denied. No token is provided." });
  }

  try {
    const decoded = setRequestUser(token);
    request.user = decoded;
    next();
  } catch (error) {
    return response
      .status(403)
      .json({ message: "Invalid or expired token.", error });
  }
};
