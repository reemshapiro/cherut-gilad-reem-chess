"use strict";

var selectedPiece; // // Regular function vs arrow function;
// function sayHello (name){
//     // code to run
//     console.log(name)
// }
// const sayBye = (name) =>{
//     console.log(name)
// }

var selectPiece = function selectPiece(event) {
  selectedPiece = event.target.id;
  event.cancelBubble = true;
  console.log("פנימי");
};

function movePiece(event) {
  var selectedLocation = event.target.id; // clean old piece location

  document.getElementById(selectedPiece).innerHTML = selectedPiece; // set piece in new location

  setPieceLocation(selectedLocation);
  console.log("חיצוני");
}

var setPieceLocation = function setPieceLocation(selectedLocation) {
  document.getElementById(selectedLocation).innerHTML += "<div class=\"pawn\" id=".concat(selectedLocation, " onclick=\"selectPiece(event)\"></div>");
};

function createBoard() {
  var colum = true;
  var html = "",
      color = "black";

  for (i = 1; i < 9; i++) {
    if (i % 2) {
      color = "white";
    } else {
      color = "black";
    }

    for (j = 1; j < 9; j++) {
      html += "<div id=".concat(i, ",").concat(j, " class='board ").concat(color, "' onclick='movePiece(event)'>").concat(i, ",").concat(j, "</div>");

      if (color == "black") {
        color = "white";
      } else {
        color = "black";
      }
    }
  }

  document.getElementById("root").innerHTML = html;
} // onInit = first function to execute when app loaded..


onInit = function onInit() {
  createBoard();
  setPieceLocation("1,1");
};