let blackPawn1 = {
  color: "black",
  position: {
    i: 2,
    j: 1
  },
  name: 'blackPawn1',
  icon: '♟'
}
let blackPawn2 = {
  color: "black",
  position: {
    i: 2,
    j: 2
  },
  name: 'blackPawn2',
  icon: '♟'
}
let blackPawn3 = {
  color: "black",
  position: {
    i: 2,
    j: 3
  },
  name: 'blackPawn3',
  icon: '♟'
}
let blackPawn4 = {
  color: "black",
  position: {
    i: 2,
    j: 4
  },
  name: 'blackPawn4',
  icon: '♟'
}
let blackPawn5 = {
  color: "black",
  position: {
    i: 2,
    j: 5
  },
  name: 'blackPawn5',
  icon: '♟'
}
let blackPawn6 = {
  color: "black",
  position: {
    i: 2,
    j: 6
  },
  name: 'blackPawn6',
  icon: '♟'
}
let blackPawn7 = {
  color: "black",
  position: {
    i: 2,
    j: 7
  },
  name: 'blackPawn7',
  icon: '♟'
}
let blackPawn8 = {
  color: "black",
  position: {
    i: 2,
    j: 8
  },
  name: 'blackPawn8',
  icon: '♟'
}
let blackCastle1 = {
  color: "black",
  position: {
    i: 1,
    j: 1
  },
  name: 'blackCastle1',
  icon: '♜'
}
let blackCastle2 = {
  color: "black",
  position: {
    i: 1,
    j: 8
  },
  name: 'blackCastle2',
  icon: '♜'
}
let blackKnight1 = {
  color: "black",
  position: {
    i: 1,
    j: 2
  },
  name: 'blackKnight1',
  icon: '♞'
}
let blackKnight2 = {
  color: "black",
  position: {
    i: 1,
    j: 7
  },
  name: 'blackKnight2',
  icon: '♞'
}
let blackBishop1 = {
  color: "black",
  position: {
    i: 1,
    j: 3
  },
  name: 'blackBishop1',
  icon: '♝'
}
let blackBishop2 = {
  color: "black",
  position: {
    i: 1,
    j: 6
  },
  name: 'blackBishop2',
  icon: '♝'
}
let blackQueen = {
  color: "black",
  position: {
    i: 1,
    j: 4
  },
  name: 'blackQueen',
  icon: '♛'
}
let blackKing = {
  color: "black",
  position: {
    i: 1,
    j: 5
  },
  name: 'blackKing',
  icon:'♚'
}
let whitePawn1 = {
  color: "white",
  position: {
    i: 7,
    j: 1
  },
  name: 'whitePawn1',
  icon:'♙'
}
let whitePawn2 = {
  color: "white",
  position: {
    i: 7,
    j: 2
  },
  name: 'whitePawn2',
  icon:'♙'
}
let whitePawn3 = {
  color: "white",
  position: {
    i: 7,
    j: 3
  },
  name: 'whitePawn3',
  icon:'♙'
}
let whitePawn4 = {
  color: "white",
  position: {
    i: 7,
    j: 4
  },
  name: 'whitePawn4',
  icon:'♙'
}
let whitePawn5 = {
  color: "white",
  position: {
    i: 7,
    j: 5
  },
  name: 'whitePawn5',
  icon:'♙'
}
let whitePawn6 = {
  color: "white",
  position: {
    i: 7,
    j: 6
  },
  name: 'whitePawn6',
  icon:'♙'
}
let whitePawn7 = {
  color: "white",
  position: {
    i: 7,
    j: 7
  },
  name: 'whitePawn7',
  icon:'♙'
}
let whitePawn8 = {
  color: "white",
  position: {
    i: 7,
    j: 8
  },
  name: 'whitePawn8',
  icon:'♙'
}
let whiteCastle1 = {
  color: "white",
  position: {
    i: 8,
    j: 1
  },
  name: 'whiteCastle1',
  icon:'♖'
}
let WhiteCastle2 = {
  color: "white",
  position: {
    i: 8,
    j: 8
  },
  name: 'whiteCastle2',
  icon:'♖'
}
let whiteKnight1 = {
  color: "white",
  position: {
    i: 8,
    j: 2
  },
  name: 'whiteKnight1',
  icon:'♘'
}
let WhiteKnight2 = {
  color: "white",
  position: {
    i: 8,
    j: 7
  },
  name: 'whiteknight2',
  icon:'♘'
}
let whiteBishop1 = {
  color: "white",
  position: {
    i: 8,
    j: 3
  },
  name: 'whiteBishop1',
  icon:'♗'
}
let WhiteBishop2 = {
  color: "white",
  position: {
    i: 8,
    j: 6
  },
  name: 'whiteBishop2',
  icon:'♗'
}
let whiteQueen = {
  color: "white",
  position: {
    i: 8,
    j: 4
  },
  name: 'whiteQueen',
  icon:'♕'
}
let whiteKing = {
  color: "white",
  position: {
    i: 8,
    j: 5
  },
  name: 'whiteKing',
  icon:'♔'
}

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