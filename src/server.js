// Server startup script
import http from "http";
import dotenv from "dotenv"; // To manage environment variables.
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Database connection
connectDB();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
