let movements;
let direction = "f";
const straightDirections = ["f", "r", "b", "l"];
const diagonallyDirections = ["fr", "br", "bl", "fl"];
allDirections = straightDirections.concat(diagonallyDirections);


const init = async (type,location) => {
  movements = await import('./movements.js');
  console.log(movements)
  let location1 = {
    x: 1,
    y: 1
  };
checkOptionalmovements(type,location)
//   console.error('pawn')
//   checkOptionalmovements("pawn", location1);
//   console.error('knight')
//   checkOptionalmovements("knight", location1);
//   console.error('rook')
//   checkOptionalmovements("rook", location1);
//   console.error('bishop')
//   checkOptionalmovements("bishop", location1);
//   console.error('queen')
//   checkOptionalmovements("queen", location1);
//   console.error('king')
//   checkOptionalmovements("king", location1);
}

function checkOptionalmovements(type, location) {
  /* Moves */
  let f; // forward
  let r; // right
  let b; // back
  let l; // left
  let fr; // forward right
  let br; // back right
  let bl; // back left
  let fl; // forward left
  let optionalmovements = [];
  let newLocation;

  switch (type) {
    case "rook":
      f = movements.stepOverRow(location, "f");
      r = movements.stepOverRow(location, "r");
      b = movements.stepOverRow(location, "b");
      l = movements.stepOverRow(location, "l");
      // optionalmovements = f.concat(r, b, l);
      optionalmovements = [...f, ...r, ...b, ...l];
      // console.log(f,r,b,l)
      console.log(optionalmovements)
      // console.log([...f,...r , ...b, ...l]);
      break;
    case "bishop":
      fr = movements.stepOverDiagonalRow(location, "fr");
      br = movements.stepOverDiagonalRow(location, "br");
      bl = movements.stepOverDiagonalRow(location, "bl");
      fl = movements.stepOverDiagonalRow(location, "fl");
      // optionalmovements = fr.concat(br, bl, fl);
      optionalmovements = [...fr, ...br, ...bl, ...fl];
      console.log(optionalmovements)
      // optionalmovements = optionalmovements.filter(
      //   (obg) => Object.keys(obg).length !== 0 && obg.x == obg.x
      // );
      break;
    case "pawn":
      if (location.y == 7) {
        newLocation = movements.stepStraight(location, "l");
        optionalmovements.push(newLocation);
        newLocation = movements.stepStraight(newLocation, "l");
        optionalmovements.push(newLocation);
      } else {
        optionalmovements.push(movements.stepStraight(location, "l"));
      }
      break;
    case "knight":
      newLocation = movements.stepStraight(location, "f");
      optionalmovements.push(
        movements.stepDiagonally(newLocation, "fr"),
        movements.stepDiagonally(newLocation, "fl")
      );
      newLocation = movements.stepStraight(location, "r");
      optionalmovements.push(
        movements.stepDiagonally(newLocation, "fr"),
        movements.stepDiagonally(newLocation, "br")
      );
      newLocation = movements.stepStraight(location, "b");
      optionalmovements.push(
        movements.stepDiagonally(newLocation, "br"),
        movements.stepDiagonally(newLocation, "bl")
      );
      newLocation = movements.stepStraight(location, "l");
      optionalmovements.push(
        movements.stepDiagonally(newLocation, "bl"),
        movements.stepDiagonally(newLocation, "fl")
      );
      optionalmovements = movements.filterNonNumbers(optionalmovements);

      // optionalmovements = optionalmovements.filter(
      //   (obg) => Object.keys(obg).length !== 0 && obg.x == obg.x
      // );
      break;
    case "queen":
      f = movements.stepOverRow(location, "f");
      r = movements.stepOverRow(location, "r");
      b = movements.stepOverRow(location, "b");
      l = movements.stepOverRow(location, "l");
      fr = movements.stepOverDiagonalRow(location, "fr");
      br = movements.stepOverDiagonalRow(location, "br");
      bl = movements.stepOverDiagonalRow(location, "bl");
      fl = movements.stepOverDiagonalRow(location, "fl");
      // optionalmovements.push(f,r,b,l,br,bl,fl);
      // optionalmovements = f.concat(r, b, l, fr, br, bl, fl);
      optionalmovements = [...f, ...r, ...b, ...l, ...br, ...bl, ...fr, ...fl]
      break;
    case "king":
      straightDirections.forEach((dir) => {
        optionalmovements.push(movements.stepStraight(location, dir));
      });
      diagonallyDirections.forEach((dir) => {
        optionalmovements.push(movements.stepDiagonally(location, dir));
      });
      optionalmovements = movements.filterNonNumbers(optionalmovements);
      break;

    default:
      break;
  }

  console.table(optionalmovements);
}





