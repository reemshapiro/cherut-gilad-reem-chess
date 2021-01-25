const express = require('express')
const app = express(); ///server;
const bodyParser = require('body-parser');
app.use(bodyParser.json()) //return req.body = body (from client)
app.use(express.static('public')) //all static files, that client get , html, js , img , css
const url = "mongodb+srv://vanilachess:vanila123@cluster0.3d34s.mongodb.net/test";
app.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');
const { chmod } = require('fs');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser')
app.use(cookieParser())


const User = mongoose.model('User', {
    userName: String,
    passWord: String,
    NOGP: Number,
    victories: Number
});
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
 

app.post('/log-in',async (req, res) => {  ///on client post
    try{
        console.log(req.body);
        const { user, password } = req.body //deconstractor
       
    
        let ok = false;
    
         let logged = await User.findOne({userName:user,});
          if (logged.passWord==password){
              ok = true
    
          }
         console.log(`logged: ${logged}`)
         
         res.cookie(`userID`,logged._id,{ maxAge: 500000, httpOnly: false })
    
        res.send({ ok,user,logged});
    }
    catch(e){console.log(e)}


})
app.post('/sign-up', (req, res) => {  ///on client post

    console.log(req.body);
    const { user, password } = req.body //deconstractor
    const newUser = new User({ userName: user,passWord : password,NOGP:0,victories:0 })
    newUser.save().then(() => console.log(`user: ${newUser} saved`));

    

    res.send({ ok:true,user});
})

io.on('connection', socket => {
    console.log(socket.rooms)

    console.log('a user connected');
})








const port = process.env.PORT || 3000;
http.listen(port, () => { console.log(`listen on port ${port}`) }) //listen to clients requests
