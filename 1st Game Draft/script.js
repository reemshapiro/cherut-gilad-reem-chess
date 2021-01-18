createBoard()

function createBoard() {
  let colum = true
  let html = ``,
    color = 'black'
  for (i = 1; i < 9; i++) {
    if (i % 2) {
      color = 'white'
    } else {
      color = 'black'
    }
    for (j = 1; j < 9; j++) {
      html += `<div id=${i, j} class='board ${color}'>${i},${j}</div>`
      if (color == 'black') {
        color = 'white'
      } else {
        color = 'black'
      }
    }
  }
  document.getElementById('root').innerHTML = html;
}

let whiteKing = {
  color: "white",
  position: {
    i: 8,
    j: 5
  },
  name: 'whiteKing'
}

// let piecesArr = [blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8, blackCastle1, blackCastle2, blackKnight1, blackKnight2, blackBishop1, blackBishop2, blackQueen, blackKing, whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8, whiteCastle1, WhiteCastle2, whiteKnight1, WhiteKnight2, whiteBishop1, WhiteBishop2, whiteQueen, whiteKing]

let piecesArr = [whiteKing]


const setPieceLocation = (selectedLocation) => {
  document.getElementById(
    selectedLocation
  ).innerHTML += `<div class="pawn" id=${piece.name} onclick="selectPiece(event)">${piece.name}</div>`;
};




let selectedPiece;


// // Regular function vs arrow function;

// function sayHello (name){
//     // code to run
//     console.log(name)
// }

// const sayBye = (name) =>{
//     console.log(name)
// }


const  selectPiece = (event) =>{
  selectedPiece = event.target.id;
  event.cancelBubble = true;
  console.log("פנימי");
}

function movePiece(event) {
  const selectedLocation = event.target.id;

  // clean old piece location
  document.getElementById(selectedPiece).innerHTML = selectedPiece;

  // set piece in new location
  setPieceLocation(selectedLocation);

  console.log("חיצוני");
}

// const setPieceLocation = (selectedLocation) => {
//   document.getElementById(
//     selectedLocation
//   ).innerHTML += `<div class="pawn" id=${selectedLocation} onclick="selectPiece(event)"></div>`;
// };

function createBoard() {
  let colum = true;
  let html = ``,
    color = "black";
  for (i = 1; i < 9; i++) {
    if (i % 2) {
      color = "white";
    } else {
      color = "black";
    }
    for (j = 1; j < 9; j++) {
      html += `<div id=${i},${j} class='board ${color}' onclick='movePiece(event)'>${i},${j}</div>`;
      if (color == "black") {
        color = "white";
      } else {
        color = "black";
      }
    }
  }
  document.getElementById("root").innerHTML = html;
}

// onInit = first function to execute when app loaded..
onInit = () => {
  createBoard();
  // setPieceLocation("1,1");
  piecesArr.forEach(piece =>{
    setPieceLocation(`${piece.position.i},${piece.position.j}`);
  })
};

