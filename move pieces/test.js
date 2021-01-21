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

const setPieceLocation = (selectedLocation) => {
  document.getElementById(
    selectedLocation
  ).innerHTML += `<div class="pawn" id=${selectedLocation} onclick="selectPiece(event)"></div>`;
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
  setPieceLocation("1,1");
};


// אכילה של חייל יריב

