const socket = io()

function oninit(){
    let username = document.cookie.split('=')[1];
    document.getElementById('username').innerHTML=`welcome ${username}!`;

    fetch(`users/${username}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.getElementById('nogp').innerHTML=`number of games played : ${data.user.NOGP}`;
        document.getElementById('victories').innerHTML=`number of victories : ${data.user.victories}`;
    })

    
    
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

