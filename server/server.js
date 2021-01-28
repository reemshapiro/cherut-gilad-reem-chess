const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/userRoutes");
const roomRouter = require("./routes/roomRoutes");
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
app.use("/room",roomRouter);

//users routs



 
//socket


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
  socket.on('move',obj=>{
    console.log(obj.piecesArr,obj.roomID)
    io.sockets.in(obj.roomID).emit('move', obj.piecesArr);
    
  })

})



// app listen
const port = process.env.PORT || 3000;
http.listen(port, () => { console.log(`listen on port ${port}`) })
