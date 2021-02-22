function selfCheckAuth(authenticatedMovements, clickedPiece, piecesArr) {
  let tempMove = { i: clickedPiece.position.i, j: clickedPiece.position.j }
  let clonePiecesArr = [...piecesArr]
  authenticatedMovements.forEach(move => {
    if (clickedPiece.color == 'white') {

      clonePiecesArr.forEach(clone => {
        if (clone.name == clickedPiece.name) {
          clone.position = move.i;
          clone.position.j = move.j
        }
      });

      let isCheck = false
      clonePiecesArr.forEach(piece => {
        if (piece.color != clickedPiece.color) {
          let location = { x: piece.position.i, y: piece.position.j }
          let movementArr = checkOptionalmovements(piece.type, location)
          let authenticatedMovementArr = movementAuthentication(movementArr, piece)
          authenticatedMovementArr.forEach(authMove => {
            if (authMove.position.i == clonePiecesArr.find(clonedPiece => clonedPiece.name == 'whiteKing').position.i && authMove.position.j == clonePiecesArr.find(clonedPiece => clonedPiece.name == 'whiteKing').position.j) {
              isCheck = true
            }

          });


        }

      });
      if (isCheck == false) {
        finalAuthenticatedMoveArr.push(move)
      }
      clonePiecesArr.forEach(clone => {
        if (clone.name == clickedPiece.name) {
          clone.position = tempMove.i;
          clone.position.j = tempMove.j
        }
      });

    }
    else{
      clonePiecesArr.forEach(clone => {
        if (clone.name == clickedPiece.name) {
          clone.position = move.i;
          clone.position.j = move.j
        }
      });

      let isCheck = false
      clonePiecesArr.forEach(piece => {
        if (piece.color != clickedPiece.color) {
          let location = { x: piece.position.i, y: piece.position.j }
          let movementArr = checkOptionalmovements(piece.type, location)
          let authenticatedMovementArr = movementAuthentication(movementArr, piece)
          authenticatedMovementArr.forEach(authMove => {
            if (authMove.position.i == clonePiecesArr.find(clonedPiece => clonedPiece.name == 'blackKing').position.i && authMove.position.j == clonePiecesArr.find(clonedPiece => clonedPiece.name == 'blackKing').position.j) {
              isCheck = true
            }

          });


        }

      });
      if (isCheck == false) {
        finalAuthenticatedMoveArr.push(move)
      }
      clonePiecesArr.forEach(clone => {
        if (clone.name == clickedPiece.name) {
          clone.position = tempMove.i;
          clone.position.j = tempMove.j
        }
      });

    }

  });
  return finalAuthenticatedMoveArr;

}

