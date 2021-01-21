

let piecesArr = [blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8, blackCastle1, blackCastle2, blackKnight1, blackKnight2, blackBishop1, blackBishop2, blackQueen, blackKing, whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8, whiteCastle1, WhiteCastle2, whiteKnight1, WhiteKnight2, whiteBishop1, WhiteBishop2, whiteQueen, whiteKing]
// console.log(piecesArr)
let selectedPiece;
let selectedPieceName;
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
      html += `<div id=${i},${j} class='board ${color}' ></div>`;
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
    setPieceLocation(`${piece.position.i},${piece.position.j}`, piece.name, piece.icon,piece.type);
  })
}

const setPieceLocation = (selectedLocation, name, icon,type) => {
  document.getElementById(
    selectedLocation
  ).innerHTML += `<div name='${name}'  icon='${icon}' type='${type}' class="pawn" id=${selectedLocation} onclick="selectPiece(event)">${icon}</div>`;
};


 const selectPiece = async  (event) => {
  selectedPiece = event.target.id;
  selectedPieceName = event.target.name;
  selectedPiece = selectedPiece.split(',')
  // console.log(typeof selectedPiece)
  // console.log(selectedPiece)
  event.cancelBubble = true;
  // console.log("פנימי");
  isClicked = true;
  pieceName = event.target.attributes[0].value;
  // console.log(pieceName)
  icon = event.target.attributes[1].value;
  type = event.target.attributes[2].value
  // console.log({x:parseInt(selectedPiece[0], 10),y:parseInt(selectedPiece[1], 10)})
  let objectifier = {i:selectedPiece[0],j:selectedPiece[1]}
  console.log(objectifier)
  // let optionalmovements =  init(type,{x:parseInt(selectedPiece[0], 10),y:parseInt(selectedPiece[1], 10)})
  let optionalmovements =  checkOptionalmovements(type,{x:parseInt(selectedPiece[0], 10),y:parseInt(selectedPiece[1], 10)})
  console.log(optionalmovements)
  let clickedpiece = {}
  piecesArr.forEach(piece => {
    if(piece.position.i==objectifier.i&&piece.position.j==objectifier.j){
      console.log(piece.position)
      console.log(objectifier)
     clickedpiece = piece
    }
    

  });
  console.log(clickedpiece)
  
  authenticatedMovements =movementAuthentication(optionalmovements, clickedpiece)



  authenticatedMovements.forEach(move => {
    console.log(move)
    console.log(document.getElementById(`${move.i},${move.j}`))
    document.getElementById(`${move.i},${move.j}`).addEventListener('click', movePiece);
    document.getElementById(`${move.i},${move.j}`).style.backgroundColor = 'red';
    
  });

}
let authenticatedMovements;

function movePiece(event) {
  let selectedLocation = event.target.id;
  let newSL = selectedLocation.split(',')
  // clean old piece location
  document.getElementById(selectedPiece).innerHTML = '';

  // set piece in new location
  setPieceLocation(selectedLocation, pieceName, icon);
  console.log(selectedLocation)
  console.log(selectedPiece)

  // console.log("חיצוני");
  isClicked = false;
  selectedPiece = '';

  authenticatedMovements.forEach(move =>{
    document.getElementById(`${move.i},${move.j}`).removeEventListener('click', movePiece);
    document.getElementById(`${move.i},${move.j}`).style.backgroundColor = '';
  })

  console.log(newSL)
  piecesArr.forEach(piece=>{
    if(selectedPieceName == piece.name){
      piece.position = {
        i: parseInt(newSL[0],10) ,
        j: parseInt(newSL[1],10)
      }
    }
  })

  console.log(piecesArr)
}


onInit = () => {
  createBoard();
  setPiecesStartPosition();
  // setPieceLocation(`${whiteKing.position.i},${whiteKing.position.j}`);
};