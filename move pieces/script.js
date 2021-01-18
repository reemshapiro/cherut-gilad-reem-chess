let selectedPiece;

let blackPawn1 = { color: "black", position: { i: 2, j: 1 }, name: 'blackPawn1' }
let blackPawn2 = { color: "black", position: { i: 2, j: 2 }, name: 'blackPawn2' }
let blackPawn3 = { color: "black", position: { i: 2, j: 3 }, name: 'blackPawn3' }
let blackPawn4 = { color: "black", position: { i: 2, j: 4 }, name: 'blackPawn4' }
let blackPawn5 = { color: "black", position: { i: 2, j: 5 }, name: 'blackPawn5' }
let blackPawn6 = { color: "black", position: { i: 2, j: 6 }, name: 'blackPawn6' }
let blackPawn7 = { color: "black", position: { i: 2, j: 7 }, name: 'blackPawn7' }
let blackPawn8 = { color: "black", position: { i: 2, j: 8 }, name: 'blackPawn8' }
let blackCastle1 = { color: "black", position: { i: 1, j: 1 }, name: 'blackCastle1' }
let blackCastle2 = { color: "black", position: { i: 1, j: 8 }, name: 'blackCastle2' }
let blackKnight1 = { color: "black", position: { i: 1, j: 2 }, name: 'blackKnight1' }
let blackKnight2 = { color: "black", position: { i: 1, j: 7 }, name: 'blackKnight2' }
let blackBishop1 = { color: "black", position: { i: 1, j: 3 }, name: 'blackBishop1' }
let blackBishop2 = { color: "black", position: { i: 1, j: 6 }, name: 'blackBishop2' }
let blackQueen = { color: "black", position: { i: 1, j: 4 }, name: 'blackQueen' }
let blackKing = { color: "black", position: { i: 1, j: 5 }, name: 'blackKing' }
let whitePawn1 = { color: "white", position: { i: 7, j: 1 }, name: 'whitePawn1' }
let whitePawn2 = { color: "white", position: { i: 7, j: 2 }, name: 'whitePawn2' }
let whitePawn3 = { color: "white", position: { i: 7, j: 3 }, name: 'whitePawn3' }
let whitePawn4 = { color: "white", position: { i: 7, j: 4 }, name: 'whitePawn4' }
let whitePawn5 = { color: "white", position: { i: 7, j: 5 }, name: 'whitePawn5' }
let whitePawn6 = { color: "white", position: { i: 7, j: 6 }, name: 'whitePawn6' }
let whitePawn7 = { color: "white", position: { i: 7, j: 7 }, name: 'whitePawn7' }
let whitePawn8 = { color: "white", position: { i: 7, j: 8 }, name: 'whitePawn8' }
let whiteCastle1 = { color: "white", position: { i: 8, j: 1 }, name: 'whiteCastle1' }
let WhiteCastle2 = { color: "white", position: { i: 8, j: 8 }, name: 'whiteCastle2' }
let whiteKnight1 = { color: "white", position: { i: 8, j: 2 }, name: 'whiteKnight1' }
let WhiteKnight2 = { color: "white", position: { i: 8, j: 7 }, name: 'whiteknight2' }
let whiteBishop1 = { color: "white", position: { i: 8, j: 3 }, name: 'whiteBishop1' }
let WhiteBishop2 = { color: "white", position: { i: 8, j: 6 }, name: 'whiteBishop2' }
let whiteQueen = { color: "white", position: { i: 8, j: 4 }, name: 'whiteQueen' }
let whiteKing = { color: "white", position: { i: 8, j: 5 }, name: 'whiteKing' }

let piecesArr = [blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8, blackCastle1, blackCastle2, blackKnight1, blackKnight2, blackBishop1, blackBishop2, blackQueen, blackKing, whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8, whiteCastle1, WhiteCastle2, whiteKnight1, WhiteKnight2, whiteBishop1, WhiteBishop2, whiteQueen, whiteKing]


// // Regular function vs arrow function;

// function sayHello (name){
//     // code to run
//     console.log(name)
// }

// const sayBye = (name) =>{
//     console.log(name)
// }

let isClicked = false;
let pieceName;
const  selectPiece = (event) =>{
  selectedPiece = event.target.id;
  event.cancelBubble = true;
  console.log("פנימי");
  isClicked = true;
  pieceName = event.target.name;
  console.log(event.target.innerHTML)
}

function movePiece(event) {
  if(isClicked = true){
  const selectedLocation = event.target.id;

  // clean old piece location
  document.getElementById(selectedPiece).innerHTML = selectedPiece;

  // set piece in new location
  setPieceLocation(selectedLocation,pieceName);

  console.log("חיצוני");
  isClicked = false;
  pieceName = '';
  }
  
}

const setPieceLocation = (selectedLocation, name) => {
  document.getElementById(
    selectedLocation
  ).innerHTML += `<div name='${name}' class="pawn" id=${selectedLocation} onclick="selectPiece(event)">${name}</div>`;
};

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
  setPiecesStartPosition();
  // setPieceLocation(`${whiteKing.position.i},${whiteKing.position.j}`);
};

function setPiecesStartPosition(){
  piecesArr.forEach(piece =>{
    setPieceLocation(`${piece.position.i},${piece.position.j}`, piece.name);
  })
}

// let whiteKing = {
//   color: "white",
//   position: {
//     i: 8,
//     j: 5
//   },
//   name: 'whiteKing'
// }


