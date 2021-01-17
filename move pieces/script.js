let selectedLocation="4,4"
let selectedPiece

function movePiece(event,selectedPiece,selectedLocation){
  console.log(event.target.id)
    document.getElementById('4,4').classList.add("pawn");
    document.getElementById("1,1").classList.remove("pawn");
console.log(2559)
}

document.getElementById("1,1").classList.add("pawn");
// movePiece(selectedPiece,selectedLocation)