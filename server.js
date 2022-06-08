const userRoutes = require("./routes/user.routes")
var express = require("express");
const http = require("http");
const cors = require("cors")
var app = express();
const { Server } = require("socket.io");
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes)
const db = require("./models/index")
db.sequelize.sync().then(()=>{
  console.log("connected")
})
// when need recreate database
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
const server = http.createServer(app);
const socketIo = new Server(server, { cors: { origin: "*" } });
global.socketIo = socketIo
// socketIo.on("connection", (socket) => {
//   console.log("New client connected  " + socket.id);

//   socket.on("sendDataClient", (data) => {
//     socketIo.emit("sendDataServer", { data });
//   });
//   socket.on("disconnect", () => {
//     console.log("client disconnected");
//   });
// });

server.listen(8000, () => {
  console.log("Running on 8000 port");
});
