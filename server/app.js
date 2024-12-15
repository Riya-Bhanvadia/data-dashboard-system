const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schedule = require("node-schedule");
const http = require("http");
const { Server } = require("socket.io");

const empRoute = require("./routes/empRoutes");
const chatRoute = require("./routes/chatRoutes");
const taskRoute = require("./routes/taskRoutes");
const adminRoute = require("./routes/adminRoutes");
const messageRoute = require("./routes/messageRoutes");
const departmentRoute = require("./routes/departmentRoutes");
const attendanceRoute = require("./routes/attendanceRoutes");

const Employee = require("./Model/employeeModel");
const Attendance = require("./Model/attendanceModel");
require("dotenv").config();
const app = express();

app.use(cors());
schedule.scheduleJob("0 0 1 * *", () => {
  const mongoFind = async (req, res, next) => {
    try {
      const data = await Employee.find({}, { attendance: 1, _id: 1 });

      for (let i = 0; i < data.length; i++) {
        await Attendance.findOneAndUpdate(
          { userId: data[i]._id },
          { $push: { attend: data[i].attendance } }
        );
      }
    } catch (error) {
      console.log(error);
    }
    console.log("working...........");
  };
  mongoFind();
});

schedule.scheduleJob("5 0 1 * *", () => {
  const emptyAttend = async () => {
    const data = await Employee.updateMany({}, { $set: { attendance: [] } });
  };
  emptyAttend();
});

// 0 0 1 * *
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(empRoute);
app.use(chatRoute);
app.use(taskRoute);
app.use(adminRoute);
app.use(messageRoute);
app.use(departmentRoute);
app.use(attendanceRoute);

app.use((err, req, res, next) => {
  // console.log(err);
  const status = err.statusCode || 422;
  const message = err.message;
  const error = new Error(message);
  error.statusCode = status;
  console.log(error.message);
  res
    .status(status)
    .json({ error: { message: error.message, statusCode: error.statusCode } });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });

  console.log("addUser", users);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  // console.log("getUserId", userId);
  // console.log(users);
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("Connected", socket.id);

  socket.on("adduser", ({ receiverId, chatId }) => {
    console.log("chatId", chatId);
    console.log("receiverId", receiverId);
  });

  socket.on("sendMessage", ({ message, chatId }) => {
    // console.log(io.sockets.adapter.rooms)
    socket.broadcast.emit(`${chatId}`, { msg: message, chatId });
  });

  socket.on("disconnect", () => {
    console.log("user Disconnected", socket.id);
    removeUser(socket.id);
  });
});

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    server.listen(5050, () => {
      console.log("Server Running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
