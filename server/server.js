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
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true,});

app.use("/users", userRouter);

//users routs




//socket
const rooms=[{roomID:'klsjdhf23',players:[{black:'asdkjfasue'},{white:'asdfasd'}]}]

app.post('/get-room', (req,res)=>{
    const{userID}=req.body
  const lastRoom= rooms[rooms.length-1]
  if(lastRoom.players.length===2){
      rooms.push({roomID:'RandomRoomNumber',players:[{black:userID}]})
  }
  else{
      rooms[rooms.length-1].players.push({white:userID})
  }
  res.send ({roomID})

})

io.on('connection', socket => {
    console.log(socket.rooms)

    console.log('a user connected');
})

// app listen
const port = process.env.PORT || 3000;
http.listen(port, () => { console.log(`listen on port ${port}`) })
