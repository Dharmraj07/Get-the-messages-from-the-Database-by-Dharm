const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/users");
//const User = require("./models/users");
const http = require("http");
const socketIO = require("socket.io");
const { User } = require("./models/users");
const { ChatMessage } = require("./models/chatModel");

const chatRoutes=require('./routes/chatRoutes');
const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer, {
  cors: { origin: "*" }
});

const PORT = 8000;


app.use(cors({
 // origin: "http://127.0.0.1:3000",
  methods: "GET, POST",
  allowedHeaders: "Content-Type, Authorization"
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', userRoutes);
app.use('/',chatRoutes);
httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    console.log(message);
    socket.broadcast.emit('chat-message', { message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
});




