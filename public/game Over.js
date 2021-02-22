// let winner = {
//   username,
//   status: 'winner'
// }
// let loser = {
//   username,
//   status: 'loser'
// }

gameOver = (winner, loser) => {

  fetch('users/updateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({winner,loser})
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      // console.log(data.user.NOGP)
    })


}