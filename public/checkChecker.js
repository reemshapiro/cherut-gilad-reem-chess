function checkChecker(atackingColor) {

    let check = { check: false, atackingColor, atackingPiece:[] }
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
                        check.atackingPiece= piece;

                    }
                    else { console.log('turn over, no check') }
                }
                else {
                    if (authenticatedMovement.i == piecesArr.find(piece => piece.name == 'blackKing').position.i && authenticatedMovement.j == piecesArr.find(piece => piece.name == 'blackKing').position.j) {

                        check.check = true
                        check.atackingPiece= piece;
                    }
                    else {
                        console.log('turn over, no check')
                    }
                }

            });

        }

    });
    console.log(check.atackingPiece)
    let escapeFromChakeMate = false;

    let escapeFromMateArr =[];


    if (check.check) {

            console.log(`הכלי שמאיים בשח הוא ${check.atackingPiece.name}`)
            
            // ______________________________ בדיקה שהמלך לא יכול לברוח

// כל אפשרויותהתנועה של המלך
            let motarLazuz =true;
            let king;
            let kingOriginalPosition;
            let optionalMovements;
            let authenticatedMovements;
        if(atackingColor == 'black'){
            king = piecesArr.find(piece=>piece.name == 'whiteKing');
            kingOriginalPosition = {i:king.position.i,j:king.position.j};
            optionalMovements = checkOptionalmovements('king',{x:king.position.i,y:king.position.j},'white');
            authenticatedMovements = movementAuthentication(optionalMovements, king);
            console.log(authenticatedMovements) 
        }else{
            king = piecesArr.find(piece=>piece.name == 'blackKing');
            kingOriginalPosition = {i:king.position.i,j:king.position.j};
            optionalMovements = checkOptionalmovements('king',{x:king.position.i,y:king.position.j},'black');
            authenticatedMovements = movementAuthentication(optionalMovements, king);
            console.log(authenticatedMovements) 
        }

        // לדמןתלוח על כל אחתמהן
        // לבוק אםמישהי לאמחזירה שח

        authenticatedMovements.forEach(auth=>{
            motarLazuz =true;
            piecesArr.forEach(piece=>{
                if(piece.name == king.name){
                    piece.position.i = auth.i;
                    piece.position.j = auth.j;
                }
                if(piece.color==atackingColor){
                   let optionalMovements2 = checkOptionalmovements(piece.type,{x:piece.position.i,y:piece.position.j},piece.name);
                   let authenticatedMovements2 = movementAuthentication(optionalMovements2, piece);
                   authenticatedMovements2.forEach(auth => {
                    //    console.log(piecesArr.find(piece=>piece.name==king.name),king.name)
                       if(auth.i == piecesArr.find(piece=>piece.name==king.name).position.i&& auth.j ==piecesArr.find(piece=>piece.name==king.name).position.j){
                        motarLazuz=false;
                       }
                   });
                }
                console.log(kingOriginalPosition)
                // if(piece.name == king.name){
                //     piece.position.i = kingOriginalPosition.i;
                //     piece.position.j =kingOriginalPosition.j;
                // }
            })
            console.log(piecesArr)
            piecesArr.forEach(piece=>{
                if(piece.name == king.name){
                    piece.position.i = kingOriginalPosition.i;
                    piece.position.j = kingOriginalPosition.j;
                }
            })
            if(motarLazuz){
            escapeFromMateArr.push({defenderPieceName:`${king.name}`,authMove:auth})
            }
        })
        // piecesArr.forEach(piece=>{
        //     if(piece.name == king.name){
        //         piece.position.i = kingOriginalPosition.i;
        //         piece.position.j = kingOriginalPosition.j;
        //     }
        // })

        // if(motarLazuz){
        //     console.error(" יש לאן לברוח")
        //     console.log(escapeFromMateArr)
        //     alert(` יש לאן לברוח`)
        // }else{
        //     console.error("אין לאן לברוח")
            // alert("אין לאן לברוח")
        

            // if(!motarLazuz){

            // ______________________________ אכילת הכלי המאיים או חסימת האיום

            let proportion = {
                direction: '',
                axis: '[]'
              };

              let kingLocation;
            
            if(atackingColor =='black'){
                kingLocation = piecesArr.find(piece => piece.name == `whiteKing`).position;

                console.log(kingLocation)
            
                let Iaxis = (check.atackingPiece.position.i) - (kingLocation.i);
                let Jaxis = (check.atackingPiece.position.j) - (kingLocation.j);
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
                      axis: 'br'
                    }
                  } else if (Iaxis > 0 && Jaxis > 0) {
                    console.log('1,1')
                    proportion = {
                      direction: 'diagonal',
                      axis: 'bl'
                    }
                  } else if (Iaxis > 0 && Jaxis < 0) {
                    console.log('1,-1')
                    proportion = {
                      direction: 'diagonal',
                      axis: 'fl'
                    }
                  } else if (Iaxis < 0 && Jaxis < 0) {
                    console.log('-1,-1')
                    proportion = {
                      direction: 'diagonal',
                      axis: 'fr'
                    }
                  }
                }
                console.log(proportion)
  
                let options;
                if (proportion.direction == 'strate') {
                  console.log('strate')
                  options = stepOverRow({
                    x: check.atackingPiece.position.i,
                    y: check.atackingPiece.position.j
                  }, proportion.axis);
                } else {
                  console.log('not strate')
                  options = stepOverDiagonalRow({
                    x: check.atackingPiece.position.i,
                    y: check.atackingPiece.position.j
                  }, proportion.axis);
                  // options = stepOverDiagonalRow({x:4,y:4},'fr');
                  console.log(options)
                }
              
                options = options.filter(obg => obg && Object.keys(obg).length !== 0 && !isNaN(obg.x))
                console.log(options)

                piecesArr.forEach(piece=>{
                    if(piece.color=='white' ){
                        let optionalMovements = checkOptionalmovements(piece.type,{x:piece.position.i,y:piece.position.j},piece.color);
                        let authenticatedMovements = movementAuthentication(optionalMovements, piece);
                        
                        authenticatedMovements.forEach(move=>{
                     

                                let block = false;
                                options.forEach(option=>{
                                  if(piece.type != 'king'){
                                    if(move.i==option.x && move.j==option.y){
                                        escapeFromChakeMate = true;
                                        block = true;
                                        escapeFromMateArr.push({defenderPieceName:`${piece.name}`,authMove:move})
                                        (`חסימה ${piece.name}`)
                                        console.error(`${move.i},${move.j}`)
                                        console.error(piece)
                                    }
                                  }
                                })

                            console.log(move,check.atackingPiece.position)
                            if(move.i==check.atackingPiece.position.i&&(move.j==check.atackingPiece.position.j)||move.i==options.find(option=>option.i==move.i)&&move.j==options.find(option=>option.j==move.j)){

                                
                                escapeFromChakeMate = true;
                                escapeFromMateArr.push({defenderPieceName:`${piece.name}`,authMove:move})
                              
                                console.error(`${move.i},${move.j}`)
                                console.error(piece)
                                // throw escapeFromChakeMate;
                            }else{
                                console.error('אףאחד לאיכול להציל אותך')
                            }
                        
                        })
                    }
                })
            }else{

                kingLocation = piecesArr.find(piece => piece.name == `blackKing`).position;

                console.log(kingLocation)
            
                let Iaxis = (check.atackingPiece.position.i) - (kingLocation.i);
                let Jaxis = (check.atackingPiece.position.j) - (kingLocation.j);
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
                      axis: 'br'
                    }
                  } else if (Iaxis > 0 && Jaxis > 0) {
                    console.log('1,1')
                    proportion = {
                      direction: 'diagonal',
                      axis: 'bl'
                    }
                  } else if (Iaxis > 0 && Jaxis < 0) {
                    console.log('1,-1')
                    proportion = {
                      direction: 'diagonal',
                      axis: 'fl'
                    }
                  } else if (Iaxis < 0 && Jaxis < 0) {
                    console.log('-1,-1')
                    proportion = {
                      direction: 'diagonal',
                      axis: 'fr'
                    }
                  }
                }
                console.log(proportion)
  
                let options;
                if (proportion.direction == 'strate') {
                  console.log('strate')
                  options = stepOverRow({
                    x: check.atackingPiece.position.i,
                    y: check.atackingPiece.position.j
                  }, proportion.axis);
                } else {
                  console.log('not strate')
                  options = stepOverDiagonalRow({
                    x: check.atackingPiece.position.i,
                    y: check.atackingPiece.position.j
                  }, proportion.axis);
                  // options = stepOverDiagonalRow({x:4,y:4},'fr');
                  console.log(options)
                }
              
                options = options.filter(obg => obg && Object.keys(obg).length !== 0 && !isNaN(obg.x) && obg.x!==kingLocation.i)
                console.log(options)

                piecesArr.forEach(piece=>{
                    if(piece.color=='black' ){                        console.error(piece)
                        console.log('שחור בשח')
                        let optionalMovements = checkOptionalmovements(piece.type,{x:piece.position.i,y:piece.position.j},piece.color);
                        console.log(optionalMovements)
                        let authenticatedMovements = movementAuthentication(optionalMovements, piece);
                        console.log(piece,authenticatedMovements)
                        authenticatedMovements.forEach(move=>{

                        

                            console.log(move,check.atackingPiece.position)

                            let block = false;
                            options.forEach(option=>{
                              if(piece.type != 'king'){
                                if(move.i==option.x && move.j==option.y){
                                    escapeFromChakeMate = true;
                                    block = true
                                    alert(`חסימה ${piece.name}`)
                                    escapeFromMateArr.push({defenderPieceName:`${piece.name}`,authMove:move})
                                    console.error(`${move.i},${move.j}`)
                                    console.error(piece)
                                }
                              }
                            })
                          
                            // console.log(move.i,options.filter(option=>option.x==move.i))
                            // console.log(move.i,options.find(option=>(option.x==move.i) && (option.y==move.j)))
                            // console.log(move.j,options.find(option=>option.x==move.i))
                            if(move.i==check.atackingPiece.position.i&&move.j==check.atackingPiece.position.j){

                                
                                escapeFromChakeMate = true;
                                escapeFromMateArr.push({defenderPieceName:`${piece.name}`,authMove:move})
                             
                                console.error(`${move.i},${move.j}`)
                                console.error(piece)
                             
                            }else{
                                console.error('אףאחד לאיכול להציל אותך')
                            }
                        
                        })
                    }
                })
            }
            if(escapeFromChakeMate){
                alert('לא מט')
            }else{
             alert(' מט')
            }
        // }
       

            
    }
// }
    
 
  
    
    console.log(escapeFromMateArr)
    return check

}