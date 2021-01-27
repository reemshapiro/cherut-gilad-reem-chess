const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/userRoutes");
// const { chmod } = require('fs');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


//DB connection
const url = "mongodb+srv://vanilachess:vanila123@cluster0.3d34s.mongodb.net/test";
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });

app.use("/users", userRouter);

//users routs




//socket
let roomIdCounter = 1
// const rooms=[{roomID:'',players:[{black:''},{white:''}]}]
const rooms = [];

app.post('/get-room', (req, res) => {
  const { userID } = req.body
  console.log(userID)
  const lastRoom = rooms[rooms.length - 1]
  console.log(lastRoom)
  if (!lastRoom) {
    rooms.push({ roomID: roomIdCounter, players: [{ black: userID }] })
    console.log('line 40')
    res.send({ roomnumber: roomIdCounter, color: 'black' })
  }
  else {
    if (lastRoom.players.length === 2) {
      roomIdCounter++
      rooms.push({ roomID: roomIdCounter, players: [{ black: userID }] })
      console.log('line 48')
      res.send({ roomnumber: roomIdCounter, color: 'black' })
    }
    else {
      rooms[rooms.length - 1].players.push({ white: userID })
      console.log('line 52')
      res.send({ roomnumber: roomIdCounter, color: 'white' })
    }


  }

  //   res.send (rooms[rooms.length-1].roomID)

})
console.log(roomIdCounter)
io.on('connection', socket => {

  console.log(socket.rooms)

  console.log('a user connected');
  socket.on('join room', roomId => {
    socket.join(roomId); //the client is now in that room
    console.log(`user has joined room `)
  })
  socket.on(`chat room message`, msgObj => {
    msgObj = JSON.parse(msgObj);

    console.log(msgObj);

    io.sockets.in(msgObj.roomId).emit('chat room message', msgObj.msg);
  })

})


// app listen
const port = process.env.PORT || 3000;
http.listen(port, () => { console.log(`listen on port ${port}`) })
