import express from "express";
import cors from "cors";
import { createServer } from "http"; 
import { Server } from "socket.io";   

const app = express();
const PORT = 8000; 


const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("appointmentBooked", (data) => {
    console.log("New Appointment Received:", data);
    
    io.emit("newAppointment", data); 
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Hospital backend & Live Sockets running at http://localhost:${PORT}`);
});