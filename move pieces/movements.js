function stepStraight(location,direction){
  let newLocation = {};
  // console.log(newLocation);
  (direction === "f" && location.y!==8) ? newLocation = {x:location.x,y:(location.y+1)} :
    (direction === "r" && location.x!==8) ? newLocation = {x:(location.x+1),y:location.y} : 
      (direction === "b" && location.y!==1) ? newLocation = {x:location.x,y:(location.y-1)} :
        (direction === "l" && location.x!==1) ? newLocation = {x:(location.x-1),y:location.y} :
          console.log('יצאת מחוץ ללוח');      
  // if(Object.keys(newLocation).length !==0){
    return newLocation
  // };
}

function stepDiagonally(location,direction){
  let newLocation = {};
  (direction === "fr" && location==location && location.y!==8 && location.x!==8) ?
    newLocation = {x:(location.x+1),y:(location.y+1)} :
  (direction === "br" && location.y!==1 && location.x!==8) ?
    newLocation = {x:(location.x+1),y:(location.y-1)}:
  (direction === "bl" && location.y!==1&& location.x!==1) ?
    newLocation = {x:(location.x-1),y:(location.y-1)} :
  (direction === "fl"&& location.y!==8 && location.x!==1)?
    newLocation = {x:(location.x-1),y:(location.y+1)} :
    console.log('יצאת מחוץ ללוח');

  // if(Object.keys(newLocation).length !==0){
    return newLocation
  // }; 
}

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
    // console.log('יצאת מחוץ ללוח');
  }
  // console.log(locations);
  if(locations){
    return locations
  }; 
  // return locations;
  
}

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
    // console.log('יצאת מחוץ ללוח');
  }
  // console.log(locations);
  // return locations;
  if(locations){
    return locations
  };
}
