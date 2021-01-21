
export const filterNonNumbers = (array) => {
  return array.filter(
      (obj) => Object.keys(obj).length !== 0 && obj.x == obj.x
    );
}

export function stepStraight(location, direction) {
  let newLocation = {};

  switch (direction) {
    case "f":
      if (location.y !== 8) {
        newLocation = {
          x: location.x,
          y: location.y + 1
        };
      }
      break;
    case "r":
      if (location.y !== 8) {
        newLocation = {
          x: location.x + 1,
          y: location.y
        };
      }
      break;
    case "b":
      if (location.y !== 1) {
        newLocation = {
          x: location.x,
          y: location.y - 1
        };
      }
      break;
    case "l":
      if (location.x !== 1) {
        newLocation = {
          x: location.x - 1,
          y: location.y
        };
      }
      break;

    default:
      console.log("יצאת מחוץ ללוח");
      break;
  }

  return newLocation;
}

export function stepDiagonally(location, direction) {
  let newLocation = {};
  switch (direction) {
    case "fr":
      if (location.y !== 8 && location.x !== 8) {
        newLocation = {
          x: location.x + 1,
          y: location.y + 1
        };
      }
      break;
    case "br":
      if (location.y !== 1 && location.x !== 8) {
        newLocation = {
          x: location.x + 1,
          y: location.y - 1
        };
      }
      break;
    case "bl":
      if (location.y !== 1 && location.x !== 1) {
        newLocation = {
          x: location.x - 1,
          y: location.y - 1
        };
      }
      break;
    case "fl":
      if (location.y !== 8 && location.x !== 1) {
        newLocation = {
          x: location.x - 1,
          y: location.y + 1
        };
      }
      break;

    default:
      console.log("יצאת מחוץ ללוח");
      break;
  }
  return newLocation;
}

export function stepOverRow(location, direction) {
  let locations = [];

  switch (direction) {
    case "f":
      if (location.y !== 8) {
        for (let i = location.y + 1; i <= 8; i++) {
          locations.push({
            x: location.x,
            y: i
          });
        }
      }
      break;

    case "r":
      if (location.x !== 8) {
        for (let i = location.x + 1; i <= 8; i++) {
          locations.push({
            x: i,
            y: location.y
          });
        }
      }
      break;

    case "b":
      if (location.y !== 1) {
        for (let i = location.y - 1; 0 < i; i--) {
          locations.push({
            x: location.x,
            y: i
          });
        }
      }
      break;

    case "l":
      if (location.x !== 1) {
        for (let i = location.x - 1; 0 < i; i--) {
          locations.push({
            x: i,
            y: location.y
          });
        }
      }
      break;

    default:
      console.log("יצאת מחוץ ללוח");
      break;
  }
  if (locations) {
    return locations;
  }
}

const checkTheLocation = (newLocation)  =>{
  return (Number.isInteger(newLocation.x) && Number.isInteger(newLocation.y));
}

export function stepOverDiagonalRow(location, direction) {
  let locations = [];
  let newLocation = location;

  switch (direction) {
    case "fr":
      if (location.y !== 8 && location.x !== 8) {
        for (let i = location.y; i < 8; i++) {
          newLocation = stepDiagonally(newLocation, direction);
          checkTheLocation(newLocation) ?  locations.push(newLocation) : null;
        }
      }
      break;

    case "br":
      if (location.y !== 1 && location.x !== 8) {
        for (let i = location.x + 1; i <= 8; i++) {
          newLocation = stepDiagonally(newLocation, direction);
          checkTheLocation(newLocation) ?  locations.push(newLocation) : null;
        }
      }
      break;

    case "bl":
      if (location.y !== 1 && location.x !== 1) {
        for (let i = location.y - 1; 0 < i; i--) {
          newLocation = stepDiagonally(newLocation, direction);
          checkTheLocation(newLocation) ?  locations.push(newLocation) : null;
        }
      }
      break;

    case "fl":
      if (direction === "fl" && location.y !== 8 && location.x !== 1) {
        for (let i = location.x - 1; 0 < i; i--) {
          newLocation = stepDiagonally(newLocation, direction);
          checkTheLocation(newLocation) ?  locations.push(newLocation) : null;
        }
      }
      break;

    default:
      console.log("יצאת מחוץ ללוח");
      break;
  }
 
  if (locations) {
    return locations;
  }
}

export const helloEden= () => {
  console.log('hello eden')
}

const helloHerut = () => {
  console.log('hello herut')
}

export const OBJNAME = () => {
  return {name:'eden',age:25,location:'tel aviv'}
}

export const herut = {name:'cherut', location:'jerusalem'}