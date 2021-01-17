let location1 = {x:1,y:1};
let direction = "f";
// fr,fl,bl,br

function stepStraight(location,direction){
  let newLocation = {};
  // console.log(newLocation);
  (direction === "f" && location.y!==8) ? newLocation = {x:location.x,y:(location.y+1)} :
    (direction === "r" && location.x!==8) ? newLocation = {x:(location.x+1),y:location.y} : 
      (direction === "b" && location.y!==1) ? newLocation = {x:location.x,y:(location.y-1)} :
        (direction === "l" && location.x!==1) ? newLocation = {x:(location.x-1),y:location.y} :

          console.log('יצאת מחוץ ללוח');
          
  // console.log(newLocation);
  // if(Object.keys(newLocation).length !==0){
    return newLocation
  // };
}
// stepStraight(location1,'l')

function stepDiagonally(location,direction){
  let newLocation = {};
  if(direction === "fr" && location==location && location.y!==8 && location.x!==8 ){
    newLocation = {x:(location.x+1),y:(location.y+1)};
    // return newLocation
  }else if(direction === "br" && location.y!==1 && location.x!==8){
    newLocation = {x:(location.x+1),y:(location.y-1)};
    // return newLocation
  }else if(direction === "bl" && location.y!==1&& location.x!==1){
    newLocation = {x:(location.x-1),y:(location.y-1)};
    // return newLocation
  }else if(direction === "fl"&& location.y!==8 && location.x!==1){
    newLocation = {x:(location.x-1),y:(location.y+1)};
    // return newLocation
  }else{
    console.log('יצאת מחוץ ללוח')
  }

  // if(Object.keys(newLocation).length !==0){
    return newLocation
  // }; 
  

}
// stepDiagonally(location1, 'bl');


function stepOverRow(location,direction){
  let locations = [];
  if(direction === "f" && location.y!==8){
    for (let i = location.y+1; i <= 8; i++) {
      locations.push({X:location.x ,y:i});
    } 
  }else if(direction === "r" && location.x!==8){
    for (let i = location.x+1; i <= 8; i++) {
      locations.push({X:i ,y:location.y});
    } 
  }else if(direction === "b" && location.y!==1){
    for (let i = location.y-1; 0 < i; i--) {
      locations.push({X:location.x ,y:i});
    } 
  }else if(direction === "l"  && location.x!==1){
    for (let i = location.x-1; 0 < i; i--) {
      locations.push({X:i ,y:location.y});
    } 
  }else {
    console.log('יצאת מחוץ ללוח');
  }
  // console.log(locations);
  if(locations){
    return locations
  }; 
  // return locations;
  
}
// stepOverRow(location1,'f');

function stepOverDiagonalRow(location,direction){
  let locations = [];
  let newLocation = location;
  if(direction === "fr" && location.y!==8 && location.x!==8){
    for (let i = location.y; i < 8; i++) {
      newLocation = stepDiagonally(newLocation,direction);
      locations.push(newLocation);
    } 
  }else if(direction === "br" && location.y!==1 && location.x!==8){
    for (let i = location.x+1; i <= 8; i++) {
      newLocation = stepDiagonally(newLocation,direction);
      locations.push(newLocation);
    } 
  }else if(direction === "bl" && location.y!==1&& location.x!==1){
    for (let i = location.y-1; 0 < i; i--) {
      newLocation = stepDiagonally(newLocation,direction);
      locations.push(newLocation);
    } 
  }else if(direction === "fl"&& location.y!==8 && location.x!==1){
    for (let i = location.x-1; 0 < i; i--) {
      newLocation = stepDiagonally(newLocation,direction);
      locations.push(newLocation);
    } 
  }else {
    console.log('יצאת מחוץ ללוח');
  }
  // console.log(locations);
  // return locations;
  if(locations){
    return locations
  };
}
// stepOverDiagonalRow(location1, 'fl')

function checkOptionalmovements(type,location){
  let optionalmovements = [];
  if(type == 'rook'){
    let f = stepOverRow(location,'f');
    var r = stepOverRow(location,'r');
    var b = stepOverRow(location,'b');
    var l = stepOverRow(location,'l');
    optionalmovements = f.concat(r,b,l);
  }else if(type == 'bishop'){
    let fr = stepOverDiagonalRow(location,'fr');
    var br = stepOverDiagonalRow(location,'br');
    var bl = stepOverDiagonalRow(location,'bl');
    var fl = stepOverDiagonalRow(location,'fl');
    optionalmovements = fr.concat(br,bl,fl);
    optionalmovements = optionalmovements.filter(obg=> Object.keys(obg).length !==0 && obg.x == obg.x);
  }else if(type == 'pawn'){
    let newLocation;
    if(location.y == 2){
    newLocation = stepStraight(location,'f');
    optionalmovements.push(newLocation);
    newLocation = stepStraight(newLocation,'f');
    optionalmovements.push(newLocation);
    }else{
      optionalmovements.push(stepStraight(location,'f'));
    }
  }else if(type == 'knight'){
    let newLocation;
    newLocation = stepStraight(location,'f');
    optionalmovements.push(stepDiagonally(newLocation,'fr'),stepDiagonally(newLocation,'fl'));
    newLocation = stepStraight(location,'r');
    optionalmovements.push(stepDiagonally(newLocation,'fr'),stepDiagonally(newLocation,'br'));
    newLocation = stepStraight(location,'b');
    optionalmovements.push(stepDiagonally(newLocation,'br'),stepDiagonally(newLocation,'bl'));
    newLocation = stepStraight(location,'l');
    optionalmovements.push(stepDiagonally(newLocation,'bl'),stepDiagonally(newLocation,'fl'));
    optionalmovements = optionalmovements.filter(obg=> Object.keys(obg).length !==0 && obg.x == obg.x);
  }else if(type == 'queen'){
    let f = stepOverRow(location,'f');
    let r = stepOverRow(location,'r');
    let b = stepOverRow(location,'b');
    let l = stepOverRow(location,'l');
    let fr = stepOverDiagonalRow(location,'fr');
    let br = stepOverDiagonalRow(location,'br');
    let bl = stepOverDiagonalRow(location,'bl');
    let fl = stepOverDiagonalRow(location,'fl');
    // optionalmovements.push(f,r,b,l,br,bl,fl);
    optionalmovements = f.concat(r,b,l,fr,br,bl,fl);
    optionalmovements = optionalmovements.filter(obg=> Object.keys(obg).length !==0 && obg.x == obg.x);
  }else if(type == 'king'){
    let f = stepStraight(location,'f');
    let r = stepStraight(location,'r');
    let b = stepStraight(location,'b');
    let l = stepStraight(location,'l');
    let fr = stepDiagonally(location,'fr');
    let br = stepDiagonally(location,'br');
    let bl = stepDiagonally(location,'bl');
    let fl = stepDiagonally(location,'fl');
    optionalmovements.push(f,r,b,l,fr,br,bl,fl);
    optionalmovements = optionalmovements.filter(obg=> obg && Object.keys(obg).length !==0);
    }
  console.log(optionalmovements)
}

checkOptionalmovements('queen',location1);






