const socket = io()
let userID;

let piecesArr = [blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8, blackCastle1, blackCastle2, blackKnight1, blackKnight2, blackBishop1, blackBishop2, blackQueen, blackKing, whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8, whiteCastle1, WhiteCastle2, whiteKnight1, WhiteKnight2, whiteBishop1, WhiteBishop2, whiteQueen, whiteKing]
let outOfGamePiecesWhite = []
let outOfGamePiecesBlack = []
let authenticatedMovements;
let selectedPiece;
let selectedPieceName;
let pieceName;
let icon;
let type;
let cookie;
let color;
let username;
let roomID;

let currentTurn = 'white';
let myColor;

let boardRotates = false;

handleSendMessage = (event => {
  event.preventDefault();
  let message = event.target.children.message.value;
  if (message.trim()) {
    socket.emit('chatMessage', [message, roomID, myColor],)
  }
})

document.getElementById('turnTheBoard').addEventListener('click', function () {
  (!boardRotates) ? boardRotates = 'upsideDown' : boardRotates = false;
  console.log(boardRotates)
  document.querySelector('#root').classList.toggle("upsideDown");
  let pieces = document.querySelectorAll(".board");
  pieces.forEach(elm => {
    elm.classList.toggle("upsideDown");
  })

  if (boardRotates) {
    document.querySelector('.columnsNumbers').style.flexDirection = 'row-reverse';
    document.querySelector('.rowLetters').style.flexDirection = 'column';
  } else {
    document.querySelector('.columnsNumbers').style.flexDirection = 'row';
    document.querySelector('.rowLetters').style.flexDirection = 'column-reverse';
  }
  // let columnsNumbers = document.querySelector('.columnsNumbers').style.flexDirection;
  // console.log(columnsNumbers)
  // (columnsNumbers=='row-reverse')? columnsNumbers='row':columnsNumbers='row-reverse';
  // let rowLetters = document.querySelector('.rowLetters').style.flexDirection;
  // console.log(rowLetters)
  // (rowLetters=='column')? rowLetters='column-reverse':rowLetters='column';
});

socket.on('chatMessage', msg => {
  console.log(msg)
  let textColor;
  (msg[1] == 'white') ? textColor = 'black' : textColor = 'white';
  let direction;
  (msg[1] == myColor) ? direction = 'start' : direction = 'end';
  document.querySelector('.messages').innerHTML += `<h4 class='box' style="text-align: ${direction};"><p class='msg' style="background:${msg[1]}; color:${textColor}">${msg[0]}</p></h4>`;
  document.querySelector('#message').value = '';
  document.querySelector('.messages').scrollTop = document.querySelector('.messages').scrollHeight;

});



socket.on('move', move => {
  // console.log('script.js line 17')
  createBoard(boardRotates)
  // console.log(move)
  piecesArr = move[0];
  piecesArr.forEach(piece => {
    setPieceLocation(`${piece.position.i},${piece.position.j}`, piece.name, piece.icon, piece.type);
  })
  // console.log(piecesArr)
  let rival = move[1];
  console.log(`your rival is ${rival}`)
  let turn = move[2];
  console.log(`${turn} turn`)
  currentTurn = turn;
  let WhoseTurn;
  (currentTurn == myColor) ? WhoseTurn = 'your' : WhoseTurn = 'rival';
  document.getElementById('turn').innerText = `${WhoseTurn} turn`;
  if (WhoseTurn == 'your') {
    document.getElementById('turn').style.border = '2px solid white'
  } else[
    document.getElementById('turn').style.border = 'none'
  ]
  outOfGamePiecesWhite = move[3];
  outOfGamePiecesBlack = move[4];
  console.log(outOfGamePiecesWhite, outOfGamePiecesBlack)

  let HtmlBlack = '';
  let HtmlWhite = '';
  outOfGamePiecesBlack.forEach(element => { HtmlBlack += `<div> ${element.icon} </div>` });
  document.querySelector(`.outOfGamePieces__black`).innerHTML = HtmlBlack;
  outOfGamePiecesWhite.forEach(element => { HtmlWhite += `<div> ${element.icon} </div>` });
  document.querySelector(`.outOfGamePieces__white`).innerHTML = HtmlWhite
  let defendingColor
  let attackingColor = move[5]
  console.log(attackingColor)
  
  if(attackingColor){
    if(attackingColor=='white'){
      defendingColor= `Black is in check`  
    }
    else{
      defendingColor = `White is in check`
    }
    // alert(defendingColor)
    document.getElementById('turn').innerText=`${defendingColor}`
    
  }
});

socket.on('playerConnection', obj => {
  // console.log(obj)
  if (obj !== userID) {
    document.getElementById(`rival`).innerText = `your rival is ${obj}`
  }


});




// creat an empty game board
function createBoard(boardRotates) {

  let html = ``,
    color = "black";
  for (i = 1; i < 9; i++) {
    if (i % 2) {
      color = "white";
    } else {
      color = "black";
    }
    for (j = 1; j < 9; j++) {
      html += `<div id=${i},${j} class='board ${color} ${boardRotates}' ></div>`;
      if (color == "black") {
        color = "white";
      } else {
        color = "black";
      }
    }
  }

  document.getElementById("root").innerHTML = html;
}

// add the game pieces by position that defined in the array
function setPiecesStartPosition() {
  piecesArr.forEach(piece => {
    setPieceLocation(`${piece.position.i},${piece.position.j}`, piece.name, piece.icon, piece.type);
  })
}

// piece movement happens in two clicks. first click on the piece you want to move, and second click on the wanted new location
//click on piece
 function  selectPiece (event) {

  pieceName = event.target.attributes[0].value
  pieceColor = pieceName.slice(0, 5);
  selectedPiece = event.target.id;
  selectedPiece = selectedPiece.split(',')// for matching later

  let isDetention = checkIfDetention(selectedPiece,pieceColor);
  console.error(isDetention)
  if(isDetention){
    alert('This tool is riveted')
  }else{
  // console.log(pieceColor)

  if (myColor == currentTurn && myColor == pieceColor) {
    // console.log('its my turn')

    //Reduces click to tool only
    // event.cancelBubble = true;

    

    //catch piece details (from the DOM)
    selectedPieceName = event.target.attributes[0].value;


    icon = event.target.attributes[1].value;
    type = event.target.attributes[2].value;


    // for the match between functions  , Conversion from x & y to i & j
    let objectifier = { i: selectedPiece[0], j: selectedPiece[1] }

    //get all the optional movements for the choosen piece by type and location. (the location is converting from string to number)
    let optionalmovements = checkOptionalmovements(type, { x: parseInt(selectedPiece[0], 10), y: parseInt(selectedPiece[1], 10) }, pieceColor)

    //for match, catch all the piece object from the pieces array (and not only its details from the DOM)
    let clickedpiece = {}
    piecesArr.forEach(piece => {
      if (piece.position.i == objectifier.i && piece.position.j == objectifier.j) {
        clickedpiece = piece
      }
    });

    //gets the legal movements only from all the optional movements
    authenticatedMovements = movementAuthentication(optionalmovements, clickedpiece)

    //catch all the board locations, clean them (in case its alredy marked) and remove the option to click it and locate there a piece ( in case the user clicked a piece right after another without move it )
    let allBoardBox = document.getElementById('root').children;
    for (let index = 0; index < allBoardBox.length; index++) {
      allBoardBox[index].removeEventListener('click', movePiece);
      allBoardBox[index].style.backgroundColor = '';
    }


    // highlight the legal movement locations 
    authenticatedMovements.forEach(move => {
      document.getElementById(`${move.i},${move.j}`).addEventListener('click', movePiece);
      document.getElementById(`${move.i},${move.j}`).style.backgroundColor = '#B5FF95';
      document.getElementById(`${move.i},${move.j}`).style.boxShadow = '4px 4px 8px 4px #fff, 3px 6px 20px 3px #fff';
    });




  } else if (myColor !== currentTurn) {
    console.log('it is not your turn')
  } else if (myColor !== pieceColor) {
    console.log('it is not your piece color')
  }
}



}





//click on new location a
function movePiece(event) {
  // get the selected location numbers
  let check = false
  let checkCheck 
  let selectedLocation = event.target.id;
  let newSL = selectedLocation.split(',')// for matching later

  // check if there is a rival piece located in the selected location and if so - do an "eating":remove the rival piece from the pieces array and push it the right 'out of game' array according to its color
  piecesArr.map((piece, index) => {
    if (piecesArr[index].position.i == parseInt(newSL[0], 10) && piecesArr[index].position.j == parseInt(newSL[1], 10)) {
      document.getElementById(selectedLocation).innerHTML = '';
      (piecesArr[index].color == 'black') ? outOfGamePiecesBlack.push(piecesArr[index]) : outOfGamePiecesWhite.push(piecesArr[index])
      piecesArr.splice(index, 1)
      console.log(outOfGamePiecesBlack, outOfGamePiecesWhite)
      //     let Html = '';
      //       outOfGamePiecesWhite.forEach(element => {Html += `<div> ${element.icon} </div>`

      //       });
      //       outOfGamePiecesBlack.forEach(element => {Html += `<div> ${element.icon} </div>`

      //     });
      //     if (piecesArr[index].color == 'black'){document.querySelector(`.outOfGamePieces__black`).innerHTML += Html}
      // else {document.querySelector(`.outOfGamePieces__white`).innerHTML+=Html}
      return;
    }
  })

  // clean old piece location
  document.getElementById(selectedPiece).innerHTML = '';



  //???
  // selectedPiece = '';

  //catch all the board locations, clean them (in case its alredy marked) and remove the option to click it and locate there a piece ( in case the user clicked a piece right after another without move it )
  authenticatedMovements.forEach(move => {
    document.getElementById(`${move.i},${move.j}`).removeEventListener('click', movePiece);
    document.getElementById(`${move.i},${move.j}`).style.backgroundColor = '';
  })

  //update the piece position in the pieces array
  piecesArr.map((piece, index) => {
    if (selectedPieceName == piece.name) {
      piecesArr[index].position = {
        i: parseInt(newSL[0], 10),
        j: parseInt(newSL[1], 10)
      }
    }
  })







  //enthronement
  if (type == 'pawn' && (newSL[0] == 8 || newSL[0] == 1)) {

    if (pieceColor == 'black') {
      let alignSelf;
      (newSL[0] == 8) ? alignSelf = 'flex-end' : alignSelf = 'end';
      document.getElementById(selectedLocation).innerHTML = `<div class="blackEnthronement" style="align-self:${alignSelf}">
        <button class="enthronementOption"  data-choose="whiteCastle" data-type="rook">♖</button>
        <button class="enthronementOption"  data-choose="whiteknight" data-type="knight">♘</button>
        <button class="enthronementOption"  data-choose="WhiteBishop" data-type="bishop">♗</button>
        <button class="enthronementOption"  data-choose="whiteQueen" data-type="queen">♕</button>
        </div>`;
    } else {
      let alignSelf;
      (newSL[0] == 8) ? alignSelf = 'flex-end' : alignSelf = 'end';
      document.getElementById(selectedLocation).innerHTML = `<div class="whiteEnthronement" style="align-self:${alignSelf}">
        <button class="enthronementOption"  data-choose="blackCastle" data-type="rook">♜</button>
        <button class="enthronementOption"  data-choose="blackknight" data-type="knight">♞</button>
        <button class="enthronementOption"  data-choose="blackBishop" data-type="bishop">♝</button>
        <button class="enthronementOption"  data-choose="blackQueen" data-type="queen">♛</button>
        </div>`;
    }

    // document.getElementById(selectedLocation).innerHTML  = `nlvknslvknslknvldknvlskdnv`;

    piecesArr.map((piece, index) => {
      if (piecesArr[index].name == selectedPieceName) {
        piecesArr.splice(index, 1)
      }
    })


    document.querySelector(`.${pieceColor}Enthronement`).style.display = 'block';
    document.querySelectorAll(`.enthronementOption`).forEach(button => {
      button.onclick = enthronement = (e) => {
        let enthronementChooseName = `${e.target.dataset.choose}New`;
        let enthronementChooseIcon = e.target.innerHTML;
        let enthronementChooseType = e.target.dataset.type;
        let enthronementChoose = {
          color: pieceColor,
          position: {
            i: newSL[0],
            j: newSL[1]
          },
          name: enthronementChooseName,
          icon: enthronementChooseIcon,
          type: enthronementChooseType
        }
        piecesArr.push(enthronementChoose);
        // array = [2, 9]
        console.log(piecesArr);
        // piecesArr.forEach(piece =>{
        //   if(piece.name == selectedPieceName){
        //     piecesArr.splice(index, 1)
        //   }
        // })
        document.querySelector(`.${pieceColor}Enthronement`).style.display = 'none';
        checkCheck = checkChecker(myColor)
        if(checkCheck.check){
          check = checkCheck.atackingColor
          
        }

        setPieceLocation(selectedLocation, enthronementChooseName, enthronementChooseIcon, enthronementChooseName.slice(0, 5))
        socket.emit('move', { piecesArr, roomID, userID, outOfGamePiecesBlack,check })
        // console.log(piecesArr)
      }
    })

  } else {

    // set piece in new location
    setPieceLocation(selectedLocation, pieceName, icon, type);
    checkCheck = checkChecker(myColor)
        if(checkCheck.check){
          check = checkCheck.atackingColor
          
        }

    socket.emit('move', { piecesArr, roomID, userID, outOfGamePiecesWhite, outOfGamePiecesBlack,check })
  }


 


}



//set specific piece to specific location (Dom)
const setPieceLocation = (selectedLocation, name, icon, type) => {
  document.getElementById(
    selectedLocation
  ).innerHTML += `<div name='${name}'  icon='${icon}' type='${type}' class="pawn" id=${selectedLocation} onclick="selectPiece(event)">${icon}</div>`;
};

// on game page loading creat the bord and set the pieces (get your room, color and turns)
function userDetails() {
  let cookie = document.cookie.split('=')[1].split('-')


  return cookie
}

let turn = 'white';
onInit = () => {

  socket.on('connect', function () {
    console.log('user connected')

    userID = document.cookie.split('=')[1]
    console.log(`you play as ${userID}`)

    fetch('room/getroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({ userID })

    }).then(res => res.json())
      .then(data => {
        // console.log(data)
        roomID = data.roomnumber
        rival = data.rival;
        console.log(`romm number ${roomID}`)
        console.log(`your color is ${data.color}`)
        myColor = data.color;
        // console.log('step2')
        joinRoom(roomID, userID);
        document.getElementById(`me`).innerText = `you play as ${userID} `
        document.querySelector(`.player__profile--me`).style.backgroundColor = `${myColor}`;
        let rivalColor;
        (myColor == 'black') ? rivalColor = 'white' : rivalColor = 'black';
        document.querySelector(`.player__profile--me`).style.color = `${rivalColor}`;
        document.querySelector(`.player__profile--rival`).style.backgroundColor = `${rivalColor}`;
        document.querySelector(`.player__profile--rival`).style.color = `${myColor}`;
        if (rival) {
          document.getElementById(`rival`).innerText = `your rival is ${rival}`
        }
      })

    // Connected, let's sign-up for to receive messages for this room
    // socket.emit('players', {userID,rival});
  });


  function joinRoom(roomId, userID) {
    socket.emit('join room', { roomId, userID })
    userRoomId = roomId
  }











  // cookie = userDetails()
  // color = cookie[0]
  // username = cookie[1]
  // roomID = cookie[2]

  //  document.getElementById(`${color}Player`).innerText= username

  // console.log(color, username, roomID)




  createBoard();
  setPiecesStartPosition();

  let winner = {
    username:'cherut',
    status: 'winner'
  }
  let loser = {
    username : 'or',
    status: 'loser'
  }

  gameOver(winner, loser);
};
