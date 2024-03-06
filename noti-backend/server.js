const express = require("express");
const http = require("http");
const socketIo = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = socketIo(server);


io.on("connection", (socket) => {
  console.log("user connected");


  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // when user clicks the btn the event from frontend will be sent to backend, this is 2nd step and 
  // from here we are sending the response to the frontend again ---> 2nd step
  socket.on("new_user_login", (data) => {
    console.log("ran 2nd");
    io.emit("new_user_login", { message: data.message });
  });
});


server.listen(3005, () => {
  console.log("Socket io is running on port 3005");
});
