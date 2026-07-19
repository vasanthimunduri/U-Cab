require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const driverRoutes = require("./routes/driverRoutes");
const path = require("path");
console.log(process.env.MONGO_URI);
connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/drivers", driverRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "*" },
});

// Real-time cab location tracking
// Client emits "join-booking" with a bookingId to receive location updates for that ride
// A driver-side client (or simulator) emits "cab-location-update" with { bookingId, lat, lng }
io.on("connection", (socket) => {
  socket.on("join-booking", (bookingId) => {
    socket.join(`booking:${bookingId}`);
  });

  socket.on("cab-location-update", ({ bookingId, lat, lng }) => {
    io.to(`booking:${bookingId}`).emit("cab-location", { lat, lng, timestamp: Date.now() });
  });

  socket.on("disconnect", () => {});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Ucab server running on port ${PORT}`));
