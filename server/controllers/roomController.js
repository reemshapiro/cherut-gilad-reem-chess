
let roomIdCounter = 1
// const rooms=[{roomID:'',players:[{black:''},{white:''}]}]
const rooms = [];

exports.getroom = async(req, res) => {
  const { userID } = req.body
  console.log(userID)
  const lastRoom = rooms[rooms.length - 1]
  console.log(lastRoom)
  if (!lastRoom) {
    rooms.push({ roomID: roomIdCounter, players: [{ black: userID }] })
    console.log('line 40')
    res.cookie(`userID`,`black-${userID}-${roomIdCounter}`,{ httpOnly: false })
    res.send({ roomnumber: roomIdCounter, color: 'black' })
  }
  else {
    if (lastRoom.players.length === 2) {
      roomIdCounter++
      rooms.push({ roomID: roomIdCounter, players: [{ black: userID }] })
      console.log('line 48')
      res.cookie(`userID`,`black-${userID}-${roomIdCounter}`,{ httpOnly: false })
      res.send({ roomnumber: roomIdCounter, color: 'black' })
    }
    else {
      rooms[rooms.length - 1].players.push({ white: userID })
      console.log('line 52')
      res.cookie(`userID`,`white-${userID}-${roomIdCounter}`,{ httpOnly: false })
      res.send({ roomnumber: roomIdCounter, color: 'white' })
    }


  }

    

}