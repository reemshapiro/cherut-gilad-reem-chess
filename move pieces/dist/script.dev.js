"use strict";

var selectedLocation = "4,4";
var selectedPiece = '4,4';

function movePiece(event, selectedPiece, selectedLocation) {
  selectedLocation = event.target.id;
  document.getElementById(selectedLocation).innerHTML += "<div class=\"pawn\" id=".concat(selectedLocation, " onclick=\"selectPiece(event)\"></div>");
  document.getElementById(selectedPiece).innerHTML = "";
  console.log(2559);
}

function selectPiece(event) {
  selectedPiece = event.target.id;
}

document.getElementById("1,1").classList.add("pawn"); // movePiece(selectedPiece,selectedLocation)