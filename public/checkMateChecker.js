

function checkMateChecker(defendingColor) {
    console.log(defendingColor)

    let checkMate = true
    let tempPiecesArr = []
    piecesArr.forEach(piece => {

        if (piece.color == defendingColor) {
            tempPiecesArr.push(piece)
        }
    });


    console.log(tempPiecesArr)
    tempPiecesArr.forEach(piece => {
        let tempPiece = piece.position

        let location = { x: piece.position.i, y: piece.position.j }

        let optionalMovements = checkOptionalmovements(piece.type, location)
        let movementAuthenticationArr = movementAuthentication(optionalMovements, piece)

        movementAuthenticationArr.forEach(move => {
            piece.position = move
            if (defendingColor == 'white') {
                let isCheck = checkChecker2('black', tempPiecesArr)
                console.log(piece.name)
                console.log(move)
                console.log(isCheck)
                if (isCheck == false) {
                    checkMate = false
                    console.log(isCheck)
                }
            }
            else {

                let isCheck = checkChecker2('white', tempPiecesArr)
                console.log(piece.name)
                console.log(move)
                console.log(isCheck)
                if (isCheck == false) {
                    checkMate = false

                }
            }
            piece.position = tempPiece

        });


    });
    console.log(tempPiecesArr)

    if (checkMate) {
        console.log('CHECKMATE!!!!!!!!!!')

    }
    else {
        console.log(checkMate)
        console.log('NOT CHECK MATE!!!!!!')
    }

}


function checkChecker2(atackingColor, tempPiecesArr) {
    let check = false
    piecesArr.forEach(piece => {
        if (atackingColor == piece.color) {
            let location = { x: piece.position.i, y: piece.position.j }
            let movementArr = checkOptionalmovements(piece.type, location)
            let authenticatedMovementArr = movementAuthentication(movementArr, piece)
            authenticatedMovementArr.forEach(move => {
                if (move == (tempPiecesArr.find(defendingPiece => defendingPiece.type == 'king').position)) {
                    check = true
                }
            });
        }
    });

    return check
}

