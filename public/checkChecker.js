function checkChecker(atackingColor) {

    let check = { check: false, atackingColor }
    console.log(atackingColor)
    piecesArr.forEach(piece => {
        if (piece.color == atackingColor) {
            // console.log('cheking optional movement')
            let location = { x: piece.position.i, y: piece.position.j }
            console.log(location)
            console.log(piece.name)
            let movementArr = checkOptionalmovements(piece.type, location)

            console.log(movementArr)          //not all movements are presented. need further coding
            let authenticatedMovementArr = movementAuthentication(movementArr, piece)
            console.log(piece)
            console.log(authenticatedMovementArr)
            console.log(atackingColor)
            authenticatedMovementArr.forEach(authenticatedMovement => {
                if (atackingColor == 'black') {
                    if (authenticatedMovement.i == piecesArr.find(piece => piece.name == 'whiteKing').position.i && authenticatedMovement.j == piecesArr.find(piece => piece.name == 'whiteKing').position.j) {

                        check.check = true;

                    }
                    else { console.log('turn over, no check') }
                }
                else {
                    if (authenticatedMovement.i == piecesArr.find(piece => piece.name == 'blackKing').position.i && authenticatedMovement.j == piecesArr.find(piece => piece.name == 'blackKing').position.j) {

                        check.check = true
                    }
                    else {
                        console.log('turn over, no check')
                    }
                }

            });

        }

    });
    if (check.check) {
        if (atackingColor == 'white') {
            console.log('attacking color is white')
            checkMateChecker('black')
        }
        else {
            console.log('attacking color is black')
            checkMateChecker('white')
        }
       
    }
    
   

    return check

}