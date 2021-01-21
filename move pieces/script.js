

let piecesArr = [blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8, blackCastle1, blackCastle2, blackKnight1, blackKnight2, blackBishop1, blackBishop2, blackQueen, blackKing, whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8, whiteCastle1, WhiteCastle2, whiteKnight1, WhiteKnight2, whiteBishop1, WhiteBishop2, whiteQueen, whiteKing]

let selectedPiece;
let pieceName;
let icon;

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
      html += `<div id=${i},${j} class='board ${color}' onclick='movePiece(event)'></div>`;
      if (color == "black") {
        color = "white";
      } else {
        color = "black";
      }
    }
  }
  document.getElementById("root").innerHTML = html;
}

function setPiecesStartPosition() {
  piecesArr.forEach(piece => {
    setPieceLocation(`${piece.position.i},${piece.position.j}`, piece.name, piece.icon);
  })
}

const setPieceLocation = (selectedLocation, name, icon) => {
  document.getElementById(
    selectedLocation
  ).innerHTML += `<div name='${name}' icon='${icon}' class="pawn" id=${selectedLocation} onclick="selectPiece(event)">${icon}</div>`;
};


const selectPiece = (event) => {
  selectedPiece = event.target.id;
  event.cancelBubble = true;
  console.log("פנימי");
  isClicked = true;
  pieceName = event.target.attributes[0].value;
  console.log(pieceName)
  icon = event.target.attributes[1].value;
  console.log(pieceName)
  init()
}

function movePiece(event) {
  const selectedLocation = event.target.id;

  // clean old piece location
  document.getElementById(selectedPiece).innerHTML = '';

  // set piece in new location
  setPieceLocation(selectedLocation, pieceName, icon);
  console.log(selectedLocation)
  console.log(selectedPiece)

  console.log("חיצוני");
  isClicked = false;
  selectedPiece = '';

}


onInit = () => {
  createBoard();
  setPiecesStartPosition();
  // setPieceLocation(`${whiteKing.position.i},${whiteKing.position.j}`);
};