let movements;
let direction = "f";
const straightDirections = ["f", "r", "b", "l"];
const diagonallyDirections = ["fr", "br", "bl", "fl"];
allDirections = straightDirections.concat(diagonallyDirections);


// const init =  (type,location) => {
  // movements = await import('./movements.js');
  // console.log(movements)
  // let location1 = {
  //   x: 1,
  //   y: 1
  // };
// checkOptionalmovements(type,location);
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
// }

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
      f = stepOverRow(location, "f");
      r = stepOverRow(location, "r");
      b = stepOverRow(location, "b");
      l = stepOverRow(location, "l");
      // optionalmovements = f.concat(r, b, l);
      optionalmovements = [...f, ...r, ...b, ...l];
      // console.log(f,r,b,l)
      console.log(optionalmovements)
      // console.log([...f,...r , ...b, ...l]);
      break;
    case "bishop":
      fr =stepOverDiagonalRow(location, "fr");
      br = stepOverDiagonalRow(location, "br");
      bl = stepOverDiagonalRow(location, "bl");
      fl = stepOverDiagonalRow(location, "fl");
      // optionalmovements = fr.concat(br, bl, fl);
      optionalmovements = [...fr, ...br, ...bl, ...fl];
      console.log(optionalmovements)
      // optionalmovements = optionalmovements.filter(
      //   (obg) => Object.keys(obg).length !== 0 && obg.x == obg.x
      // );
      break;
    case "pawn":
      if (location.y == 7) {
        newLocation = stepStraight(location, "l");
        optionalmovements.push(newLocation);
        newLocation = stepStraight(newLocation, "l");
        optionalmovements.push(newLocation);
      } else {
        optionalmovements.push(stepStraight(location, "l"));
      }
      break;
    case "knight":
      newLocation = stepStraight(location, "f");
      console.log(newLocation)
      optionalmovements.push(
        stepDiagonally(newLocation, "fr"),
        stepDiagonally(newLocation, "fl")
      );
      newLocation = stepStraight(location, "r");
      optionalmovements.push(
        stepDiagonally(newLocation, "fr"),
        stepDiagonally(newLocation, "br")
      );
      newLocation = stepStraight(location, "b");
      optionalmovements.push(
        stepDiagonally(newLocation, "br"),
        stepDiagonally(newLocation, "bl")
      );
      newLocation = stepStraight(location, "l");
      optionalmovements.push(
        stepDiagonally(newLocation, "bl"),
        stepDiagonally(newLocation, "fl")
      );
      optionalmovements = filterNonNumbers(optionalmovements);

      // optionalmovements = optionalmovements.filter(
      //   (obg) => Object.keys(obg).length !== 0 && obg.x == obg.x
      // );
      break;
    case "queen":
      f = stepOverRow(location, "f");
      r = stepOverRow(location, "r");
      b = stepOverRow(location, "b");
      l = stepOverRow(location, "l");
      fr = stepOverDiagonalRow(location, "fr");
      br = stepOverDiagonalRow(location, "br");
      bl = stepOverDiagonalRow(location, "bl");
      fl = stepOverDiagonalRow(location, "fl");
      // optionalmovements.push(f,r,b,l,br,bl,fl);
      // optionalmovements = f.concat(r, b, l, fr, br, bl, fl);
      optionalmovements = [...f, ...r, ...b, ...l, ...br, ...bl, ...fr, ...fl]
      break;
    case "king":
      straightDirections.forEach((dir) => {
        optionalmovements.push(stepStraight(location, dir));
      });
      diagonallyDirections.forEach((dir) => {
        optionalmovements.push(stepDiagonally(location, dir));
      });
      optionalmovements = filterNonNumbers(optionalmovements);
      break;

    default:
      break;
  }
  console.log(optionalmovements)

  return optionalmovements;
}





