const socket = io()

function oninit(){
    let username = document.cookie.split('=')[1];
    document.getElementById('username').innerHTML=`welcome ${username}!`;
    document.getElementById('nogp').innerHTML=`number of games played : 0`;
    document.getElementById('victories').innerHTML=`number of victories : 0`;
}

function handleNewGame(e) {

    window.location.href = "/game.html";
    
   


}

function handleMessege(e){
    socket.emit('chat room message', JSON.stringify({ msg:'just checking', roomId:roomID }));

}


socket.on('chat room message',  msg=> {
    
    console.log(msg)
        
});

