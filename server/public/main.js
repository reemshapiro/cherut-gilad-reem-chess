const socket = io()

function handleNewGame(e) {

    window.location.href = "/game.html";
    
   


}

function handleMessege(e){
    socket.emit('chat room message', JSON.stringify({ msg:'just checking', roomId:roomID }));

}


socket.on('chat room message',  msg=> {
    
    console.log(msg)
        
});

