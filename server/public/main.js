const socket = io()
let roomID = ''
function handleNewGame(e) {


    
    
    socket.on('connect', function () {

        // Connected, let's sign-up for to receive messages for this room
        socket.emit('join room', roomId);
    });


    function joinRoom(roomId) {
        socket.emit('join room', roomId)
        userRoomId = roomId
    }
    let userID = document.cookie.split(`%`)[2]
    console.log(userID)



    fetch('/get-room', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({ userID })

    }).then(res => res.json())
        .then(data => {
            console.log(data)
            roomID = data.roomnumber
            console.log(roomID)
            joinRoom(roomID);
            
        })

    // window.location.href = "/game.html";


}

function handleMessege(e){
    socket.emit('chat room message', JSON.stringify({ msg:'just checking', roomId:roomID }));

}


socket.on('chat room message',  msg=> {
    
    console.log(msg)
        
});

