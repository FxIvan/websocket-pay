const http = require("http");
const { Server } = require("socket.io");

const listUser = [
  {
    id: 1,
    name: "Nguyen Van A",
    email: "nguyen@gmail.com",
    alias: "nguyen",
    room: "room1",
  },
  {
    id: 2,
    name: "Nguyen Van B",
    email: "vanb@gmail.com",
    alias: "vanb",
    room: "room2",
  },
  {
    id: 3,
    name: "Nguyen Van C",
    email: "vanc@gmail.com",
    alias: "vanc",
    room: "room3",
  },
];

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join_room", (roomId) => {
    console.log(`User ${socket.id} join room ${roomId}`);
    socket.join(roomId);
  });

  socket.on("send_notification", ({ dataForm }) => {
    console.log("Data received in server:", dataForm);
    io.to(dataForm.alias).emit("receive_notification", dataForm);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
