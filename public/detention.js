checkIfDetention = (selectedPiece, pieceColor) => {
  let isDetention = false;
  let oneOption = false;

  console.log('checkIfDetention')
  let clickedPiece = {};
  piecesArr.forEach(piece => {
    if (piece.position.i == selectedPiece[0] && piece.position.j == selectedPiece[1]) {
      clickedPiece = piece
    }
  });
  console.log(clickedPiece)
  console.log(piecesArr)

  let proportion = {
    direction: '',
    axis: '[]'
  };
  let kingLocation = piecesArr.find(piece => piece.name == `${pieceColor}King`).position;
  // console.log(piecesArr.find(piece => piece.name == `${pieceColor}King`))
  console.log(`${pieceColor}King`)
  console.log(kingLocation)

  let Iaxis = (selectedPiece[0]) - (kingLocation.i);
  let Jaxis = (selectedPiece[1]) - (kingLocation.j);
  console.log(Iaxis)
  console.log(Jaxis)

  if (Iaxis == 0) {
    proportion.direction = 'strate';
    (Jaxis > 0) ? proportion.axis = 'l': proportion.axis = 'r';
  } else if (Jaxis == 0) {
    proportion.direction = 'strate';
    (Iaxis < 0) ? proportion.axis = 'b': proportion.axis = 'f';
  } else if (Math.abs(Iaxis) == Math.abs(Jaxis)) {
    if (Iaxis < 0 && Jaxis > 0) {
      console.log('-1,1')
      proportion = {
        direction: 'diagonal',
        axis: 'fl'
      }
    } else if (Iaxis > 0 && Jaxis > 0) {
      console.log('1,1')
      proportion = {
        direction: 'diagonal',
        axis: 'fr'
      }
    } else if (Iaxis > 0 && Jaxis < 0) {
      console.log('1,-1')
      proportion = {
        direction: 'diagonal',
        axis: 'br'
      }
    } else if (Iaxis < 0 && Jaxis < 0) {
      console.log('-1,-1')
      proportion = {
        direction: 'diagonal',
        axis: 'bl'
      }
    }
  }
  console.log(proportion)

  let options;
  let optionsij = [];
  let piecesFound = [];
  if (proportion.direction == 'strate') {
    console.log('strate')
    options = stepOverRow({
      x: selectedPiece[0],
      y: selectedPiece[1].j
    }, proportion.axis);
  } else {
    console.log('not strate')
    options = stepOverDiagonalRow({
      x: clickedPiece.position.i,
      y: clickedPiece.position.j
    }, proportion.axis);
    // options = stepOverDiagonalRow({x:4,y:4},'fr');
    console.log(options)
  }

  options = options.filter(obg => obg && Object.keys(obg).length !== 0 && !isNaN(obg.x))
  console.log(options)

  options.forEach(option => {
    optionsij.push({
      i: option.x,
      j: option.y
    })
  });
  console.log(optionsij)

  for (let index = 0; index < optionsij.length; index++) {
    console.log(optionsij[index])
    piecesArr.forEach(piece => {
      if (piece.position.i == optionsij[index].i && piece.position.j == optionsij[index].j) {
        piecesFound.push(piece)
        console.log('if')
      } else {
        console.log('elsss')
      }

    });
  }
  console.log(piecesFound)
  piecesArr.splice(piecesArr.findIndex(piece => piece.name == clickedPiece.name), 1);
  console.log(piecesArr)

  piecesFound.forEach(piece => {
    let optionalMoves = checkOptionalmovements(piece.type, {
      x: piece.position.i,
      y: piece.position.j
    }, piece.color);
    console.log(optionalMoves)
    let authenticatedMoves = movementAuthentication(optionalMoves, piece)
    console.log(authenticatedMoves)
    authenticatedMoves.forEach(move => {
      if (move.i == kingLocation.i && move.j == kingLocation.j) {
        piecesArr.push(clickedPiece);
        let optionalMoves2 = checkOptionalmovements(clickedPiece.type, {
          x: clickedPiece.position.i,
          y: clickedPiece.position.j
        }, clickedPiece.color);
        console.log(optionalMoves2)
        let authenticatedMoves2 = movementAuthentication(optionalMoves2, clickedPiece)
        console.log(authenticatedMoves2)
        authenticatedMoves2.forEach(authMove=>{
          console.log(authMove,piece)
          if(authMove.i==piece.position.i&&authMove.j==piece.position.j){
            console.error(' אבל לא מרותק')
            oneOption = {status:true,move:{i:authMove.i,j:authMove.j}};
            return;
          }else{
            console.error('מהלכים מוגבלים')
            isDetention = true
            return;
          }
        })
        piecesArr.splice(piecesArr.findIndex(piece => piece.name == clickedPiece.name), 1);

      } else {
        console.error('לא מרותק ראשי לזוז')
      }

    })

  })

  piecesArr.push(clickedPiece);
  console.log(piecesArr)
  if(oneOption){
    // let allBoardBox = document.getElementById('root').children;
    // for (let index = 0; index < allBoardBox.length; index++) {
    //   allBoardBox[index].removeEventListener('click', movePiece);
    //   allBoardBox[index].removeEventListener('drop', movePiece);
    //   allBoardBox[index].removeEventListener('dragover', allowDrop);
    //   allBoardBox[index].style.backgroundColor = '';
    // }
    isDetention=false;
    // document.getElementById(`${oneOption.move.i},${oneOption.move.j}`).addEventListener('click', movePiece);
    // document.getElementById(`${oneOption.move.i},${oneOption.move.j}`).addEventListener('drop', movePiece);
    // document.getElementById(`${oneOption.move.i},${oneOption.move.j}`).addEventListener('dragover', allowDrop);
    // document.getElementById(`${oneOption.move.i},${oneOption.move.j}`).style.backgroundColor = '#B5FF95';
    // document.getElementById(`${oneOption.move.i},${oneOption.move.j}`).style.boxShadow = '4px 4px 8px 4px #fff, 3px 6px 20px 3px #fff';
    console.error('הגעתי לפה')
  }
  return [isDetention,oneOption];
}