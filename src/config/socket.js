import { Server } from "socket.io";

const socket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      method: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  //   WebSocket connection handling
  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Listen for cart updates and emit the new cart to all connected clients
    socket.on("cartUpdated", (cartData) => {
      console.log(`Cart updated: ${cartData}`);
      io.emit("cartUpdated", cartData); // Emit the updated cart data to all clients
    });

    socket.on("disconnect", () => {
      console.log(`${socket.id} user disconnected`);
    });
  });

  return io;
};

export default socket;
