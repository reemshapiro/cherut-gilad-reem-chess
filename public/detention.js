checkIfDetention = (selectedPiece,pieceColor) => {
  let isDetention=false;

  console.log('checkIfDetention')
  let clickedPiece = {};
  piecesArr.forEach(piece => {
    if (piece.position.i == selectedPiece[0] && piece.position.j == selectedPiece[1]) {
      clickedPiece = piece
    }
  });
  console.log(clickedPiece)
  console.log(piecesArr)
  
  let proportion = {direction:'',axis:'[]'};
  let kingLocation = piecesArr.find(piece => piece.name == `${pieceColor}King`).position;
  // console.log(piecesArr.find(piece => piece.name == `${pieceColor}King`))
  console.log(`${pieceColor}King`)
  console.log(kingLocation)

  let Iaxis =(selectedPiece[0])-(kingLocation.i);
  let Jaxis =(selectedPiece[1])-(kingLocation.j);
  console.log(Iaxis)
  console.log(Jaxis)

  if(Iaxis==0){
    proportion.direction ='strate';
    (Jaxis>0)? proportion.axis = 'l': proportion.axis = 'r';
  }else if(Jaxis==0){
    proportion.direction ='strate';
    (Iaxis<0)? proportion.axis = 'b': proportion.axis = 'f';
  }else if(Math.abs(Iaxis)==Math.abs(Jaxis)){
    if(Iaxis<0 && Jaxis>0){
      console.log('-1,1')
      proportion = {direction:'diagonal',axis:'fl'}
    }else if(Iaxis>0 && Jaxis>0){
      console.log('1,1')
      proportion = {direction:'diagonal',axis:'fr'}
    }else if(Iaxis>0 && Jaxis<0){
      console.log('1,-1')
      proportion = {direction:'diagonal',axis:'br'}
    }else if(Iaxis<0 && Jaxis<0){
      console.log('-1,-1')
      proportion = {direction:'diagonal',axis:'bl'}
    }
  }
  console.log(proportion)

  let options;
  let optionsij = [];
  let piecesFound =[];
  if(proportion.direction == 'strate'){
    console.log('strate')
    options = stepOverRow({x:selectedPiece[0],y:selectedPiece[1].j} , proportion.axis);
  }else{
    console.log('not strate')
    options = stepOverDiagonalRow({x:clickedPiece.position.i,y:clickedPiece.position.j},proportion.axis);
    // options = stepOverDiagonalRow({x:4,y:4},'fr');
    console.log(options)
  }

  options = options.filter(obg=> obg && Object.keys(obg).length !==0 && !isNaN(obg.x))
  console.log(options)

  options.forEach(option => {
    optionsij.push({i:option.x, j:option.y})
  });
  console.log(optionsij)
  
  for (let index = 0; index<optionsij.length; index++) {
    console.log(optionsij[index])
      piecesArr.forEach(piece => {
      if(piece.position.i==optionsij[index].i && piece.position.j==optionsij[index].j ){
        piecesFound.push(piece)
        console.log('if')
      }else{
        console.log('elsss')
      }
   
  });
  }
  console.log(piecesFound)
  piecesArr.splice(piecesArr.findIndex(piece => piece.name == clickedPiece.name),1);
  console.log(piecesArr)

  piecesFound.forEach(piece => {
    let optionalMoves = checkOptionalmovements(piece.type,{x:piece.position.i,y:piece.position.j},piece.color);
    console.log(optionalMoves)
    let authenticatedMoves = movementAuthentication(optionalMoves, piece)
    console.log(authenticatedMoves)
    authenticatedMoves.forEach(move =>{
      if(move.i==kingLocation.i && move.j==kingLocation.j){
        console.error('מרותק')

        isDetention = true
        
      }else{
        console.error('לא מרותק ראשי לזוז')
      }
      
    })
    
  })

  piecesArr.push(clickedPiece);
  console.log(piecesArr)
  return isDetention;
}