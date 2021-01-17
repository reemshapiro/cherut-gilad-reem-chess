let selectedLocation="4,4"
let selectedPiece='4,4'

function movePiece(event,,selectedLocation){
    selectedLocation=event.target.id
    document.getElementById(selectedLocation).innerHTML+= `<div class="pawn" id=${selectedLocation} onclick="selectPiece(event)"></div>`
    document.getElementById(selectedPiece).innerHTML="";
console.log(2559)
}
function selectPiece(event){
    selectedPiece=event.target.id
}
document.getElementById("1,1").classList.add("pawn");

// movePiece(selectedPiece,selectedLocation)