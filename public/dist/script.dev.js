"use strict";

var socket = io();
var userID;
var piecesArr = [blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8, blackCastle1, blackCastle2, blackKnight1, blackKnight2, blackBishop1, blackBishop2, blackQueen, blackKing, whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8, whiteCastle1, WhiteCastle2, whiteKnight1, WhiteKnight2, whiteBishop1, WhiteBishop2, whiteQueen, whiteKing];
var outOfGamePiecesWhite = [];
var outOfGamePiecesBlack = [];
var authenticatedMovements;
var selectedPiece;
var selectedPieceName;
var pieceName;
var icon;
var type;
var cookie;
var color;
var username;
var roomID;
var currentTurn = 'white';
var myColor;
socket.on('move', function (move) {
  // console.log('script.js line 17')
  createBoard(); // console.log(move)

  piecesArr = move[0];
  piecesArr.forEach(function (piece) {
    setPieceLocation("".concat(piece.position.i, ",").concat(piece.position.j), piece.name, piece.icon, piece.type);
  }); // console.log(piecesArr)

  var rival = move[1];
  console.log("your rival is ".concat(rival));
  var turn = move[2];
  console.log("".concat(turn, " turn"));
  currentTurn = turn;
  document.getElementById('turn').innerText = "its ".concat(currentTurn, " turn");
});
socket.on('playerConnection', function (obj) {
  // console.log(obj)
  if (obj !== userID) {
    document.getElementById("rival").innerText = "your rival is ".concat(obj);
  }
}); // creat an empty game board

function createBoard() {
  var html = "",
      color = "black";

  for (i = 1; i < 9; i++) {
    if (i % 2) {
      color = "white";
    } else {
      color = "black";
    }

    for (j = 1; j < 9; j++) {
      html += "<div id=".concat(i, ",").concat(j, " class='board ").concat(color, "' ></div>");

      if (color == "black") {
        color = "white";
      } else {
        color = "black";
      }
    }
  }

  document.getElementById("root").innerHTML = html;
} // add the game pieces by position that defined in the array


function setPiecesStartPosition() {
  piecesArr.forEach(function (piece) {
    setPieceLocation("".concat(piece.position.i, ",").concat(piece.position.j), piece.name, piece.icon, piece.type);
  });
} // piece movement happens in two clicks. first click on the piece you want to move, and second click on the wanted new location
//click on piece


function selectPiece(event) {
  pieceName = event.target.attributes[0].value;
  pieceColor = pieceName.slice(0, 5); // console.log(pieceColor)

  if (myColor == currentTurn && myColor == pieceColor) {
    // console.log('its my turn')
    //Reduces click to tool only
    // event.cancelBubble = true;
    selectedPiece = event.target.id;
    selectedPiece = selectedPiece.split(','); // for matching later
    //catch piece details (from the DOM)

    selectedPieceName = event.target.attributes[0].value;
    icon = event.target.attributes[1].value;
    type = event.target.attributes[2].value; // for the match between functions  , Conversion from x & y to i & j

    var objectifier = {
      i: selectedPiece[0],
      j: selectedPiece[1]
    }; //get all the optional movements for the choosen piece by type and location. (the location is converting from string to number)

    var optionalmovements = checkOptionalmovements(type, {
      x: parseInt(selectedPiece[0], 10),
      y: parseInt(selectedPiece[1], 10)
    }, pieceColor); //for match, catch all the piece object from the pieces array (and not only its details from the DOM)

    var clickedpiece = {};
    piecesArr.forEach(function (piece) {
      if (piece.position.i == objectifier.i && piece.position.j == objectifier.j) {
        clickedpiece = piece;
      }
    }); //gets the legal movements only from all the optional movements

    authenticatedMovements = movementAuthentication(optionalmovements, clickedpiece); //catch all the board locations, clean them (in case its alredy marked) and remove the option to click it and locate there a piece ( in case the user clicked a piece right after another without move it )

    var allBoardBox = document.getElementById('root').children;

    for (var index = 0; index < allBoardBox.length; index++) {
      allBoardBox[index].removeEventListener('click', movePiece);
      allBoardBox[index].style.backgroundColor = '';
    } // highlight the legal movement locations 


    authenticatedMovements.forEach(function (move) {
      document.getElementById("".concat(move.i, ",").concat(move.j)).addEventListener('click', movePiece);
      document.getElementById("".concat(move.i, ",").concat(move.j)).style.backgroundColor = 'red';
    });
  } else if (myColor !== currentTurn) {
    console.log('it is not your turn');
  } else if (myColor !== pieceColor) {
    console.log('it is not your piece color');
  }
} //click on new location a


function movePiece(event) {
  // get the selected location numbers
  var selectedLocation = event.target.id;
  var newSL = selectedLocation.split(','); // for matching later
  // check if there is a rival piece located in the selected location and if so - do an "eating":remove the rival piece from the pieces array and push it the right 'out of game' array according to its color

  piecesArr.map(function (piece, index) {
    if (piecesArr[index].position.i == parseInt(newSL[0], 10) && piecesArr[index].position.j == parseInt(newSL[1], 10)) {
      document.getElementById(selectedLocation).innerHTML = '';
      piecesArr[index].color == 'black' ? outOfGamePiecesBlack.push(piecesArr[index]) : outOfGamePiecesWhite.push(piecesArr[index]);
      piecesArr.splice(index, 1);
      console.log(outOfGamePiecesBlack, outOfGamePiecesWhite);
      var Html;
      outOfGamePiecesWhite.forEach(function (element) {
        Html += "<div> ".concat(element.icon, " </div>");
      });
      outOfGamePiecesBlack.forEach(function (element) {
        Html += "<div> ".concat(element.icon, " </div>");
      });

      if (piecesArr[index].color == 'black') {
        document.querySelector(".outOfGamePieces__black").innerHTML = Html;
      } else {
        document.querySelector(".outOfGamePieces__white").innerHTML = Html;
      }

      return;
    }
  }); // clean old piece location

  document.getElementById(selectedPiece).innerHTML = ''; //???
  // selectedPiece = '';
  //catch all the board locations, clean them (in case its alredy marked) and remove the option to click it and locate there a piece ( in case the user clicked a piece right after another without move it )

  authenticatedMovements.forEach(function (move) {
    document.getElementById("".concat(move.i, ",").concat(move.j)).removeEventListener('click', movePiece);
    document.getElementById("".concat(move.i, ",").concat(move.j)).style.backgroundColor = '';
  }); //update the piece position in the pieces array

  piecesArr.map(function (piece, index) {
    if (selectedPieceName == piece.name) {
      piecesArr[index].position = {
        i: parseInt(newSL[0], 10),
        j: parseInt(newSL[1], 10)
      };
    }
  }); //enthronement

  if (type == 'pawn' && (newSL[0] == 8 || newSL[0] == 1)) {
    if (pieceColor == 'black') {
      var alignSelf;
      newSL[0] == 8 ? alignSelf = 'flex-end' : alignSelf = 'end';
      document.getElementById(selectedLocation).innerHTML = "<div class=\"blackEnthronement\" style=\"align-self:".concat(alignSelf, "\">\n        <button class=\"enthronementOption\"  data-choose=\"whiteCastle\" data-type=\"rook\">\u2656</button>\n        <button class=\"enthronementOption\"  data-choose=\"whiteknight\" data-type=\"knight\">\u2658</button>\n        <button class=\"enthronementOption\"  data-choose=\"WhiteBishop\" data-type=\"bishop\">\u2657</button>\n        <button class=\"enthronementOption\"  data-choose=\"whiteQueen\" data-type=\"queen\">\u2655</button>\n        </div>");
    } else {
      var _alignSelf;

      newSL[0] == 8 ? _alignSelf = 'flex-end' : _alignSelf = 'end';
      document.getElementById(selectedLocation).innerHTML = "<div class=\"whiteEnthronement\" style=\"align-self:".concat(_alignSelf, "\">\n        <button class=\"enthronementOption\"  data-choose=\"blackCastle\" data-type=\"rook\">\u265C</button>\n        <button class=\"enthronementOption\"  data-choose=\"blackknight\" data-type=\"knight\">\u265E</button>\n        <button class=\"enthronementOption\"  data-choose=\"blackBishop\" data-type=\"bishop\">\u265D</button>\n        <button class=\"enthronementOption\"  data-choose=\"blackQueen\" data-type=\"queen\">\u265B</button>\n        </div>");
    } // document.getElementById(selectedLocation).innerHTML  = `nlvknslvknslknvldknvlskdnv`;


    piecesArr.map(function (piece, index) {
      if (piecesArr[index].name == selectedPieceName) {
        piecesArr.splice(index, 1);
      }
    });
    document.querySelector(".".concat(pieceColor, "Enthronement")).style.display = 'block';
    document.querySelectorAll(".enthronementOption").forEach(function (button) {
      button.onclick = enthronement = function enthronement(e) {
        var enthronementChooseName = "".concat(e.target.dataset.choose, "New");
        var enthronementChooseIcon = e.target.innerHTML;
        var enthronementChooseType = e.target.dataset.type;
        var enthronementChoose = {
          color: pieceColor,
          position: {
            i: newSL[0],
            j: newSL[1]
          },
          name: enthronementChooseName,
          icon: enthronementChooseIcon,
          type: enthronementChooseType
        };
        piecesArr.push(enthronementChoose); // array = [2, 9]

        console.log(piecesArr); // piecesArr.forEach(piece =>{
        //   if(piece.name == selectedPieceName){
        //     piecesArr.splice(index, 1)
        //   }
        // })

        document.querySelector(".".concat(pieceColor, "Enthronement")).style.display = 'none';
        setPieceLocation(selectedLocation, enthronementChooseName, enthronementChooseIcon, enthronementChooseName.slice(0, 5));
        socket.emit('move', {
          piecesArr: piecesArr,
          roomID: roomID,
          userID: userID
        }); // console.log(piecesArr)
      };
    });
  } else {
    // set piece in new location
    setPieceLocation(selectedLocation, pieceName, icon, type);
    socket.emit('move', {
      piecesArr: piecesArr,
      roomID: roomID,
      userID: userID
    });
  }
} //set specific piece to specific location (Dom)


var setPieceLocation = function setPieceLocation(selectedLocation, name, icon, type) {
  document.getElementById(selectedLocation).innerHTML += "<div name='".concat(name, "'  icon='").concat(icon, "' type='").concat(type, "' class=\"pawn\" id=").concat(selectedLocation, " onclick=\"selectPiece(event)\">").concat(icon, "</div>");
}; // on game page loading creat the bord and set the pieces (get your room, color and turns)


function userDetails() {
  var cookie = document.cookie.split('=')[1].split('-');
  return cookie;
}

var turn = 'white';

onInit = function onInit() {
  socket.on('connect', function () {
    console.log('user connected');
    userID = document.cookie.split('=')[1];
    console.log("you play as ".concat(userID));
    fetch('room/getroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: userID
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      // console.log(data)
      roomID = data.roomnumber;
      rival = data.rival;
      console.log("romm number ".concat(roomID));
      console.log("your color is ".concat(data.color));
      myColor = data.color; // console.log('step2')

      joinRoom(roomID, userID);
      document.getElementById("me").innerText = "you play as ".concat(userID);

      if (rival) {
        document.getElementById("rival").innerText = "your rival is ".concat(rival);
      }
    }); // Connected, let's sign-up for to receive messages for this room
    // socket.emit('players', {userID,rival});
  });

  function joinRoom(roomId, userID) {
    socket.emit('join room', {
      roomId: roomId,
      userID: userID
    });
    userRoomId = roomId;
  } // cookie = userDetails()
  // color = cookie[0]
  // username = cookie[1]
  // roomID = cookie[2]
  //  document.getElementById(`${color}Player`).innerText= username
  // console.log(color, username, roomID)


  createBoard();
  setPiecesStartPosition();
};