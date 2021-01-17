"use strict";

var location1 = {
  x: 4,
  y: 8
};
var direction = "f"; // fr,fl,bl,br

function stepStraight(location, direction) {
  var newLocation; // console.log(newLocation);

  direction === "f" && location.y !== 8 ? newLocation = {
    x: location.x,
    y: location.y + 1
  } : direction === "r" && location.x !== 8 ? newLocation = {
    x: location.x + 1,
    y: location.y
  } : direction === "b" && location.y !== 1 ? newLocation = {
    x: location.x,
    y: location.y - 1
  } : direction === "l" && location.x !== 1 ? newLocation = {
    x: location.x - 1,
    y: location.y
  } : console.log('יצאת מחוץ ללוח'); // console.log(newLocation);
  // if(Object.keys(newLocation).length !==0){

  return newLocation; // };
} // stepStraight(location1,'l')


function stepDiagonally(location, direction) {
  var newLocation = {};

  if (direction === "fr" && location.y !== 8 && location.x !== 8) {
    newLocation = {
      x: location.x + 1,
      y: location.y + 1
    }; // return newLocation
  } else if (direction === "br" && location.y !== 1 && location.x !== 8) {
    newLocation = {
      x: location.x + 1,
      y: location.y - 1
    }; // return newLocation
  } else if (direction === "bl" && location.y !== 1 && location.x !== 1) {
    newLocation = {
      x: location.x - 1,
      y: location.y - 1
    }; // return newLocation
  } else if (direction === "fl" && location.y !== 8 && location.x !== 1) {
    newLocation = {
      x: location.x - 1,
      y: location.y + 1
    }; // return newLocation
  } else {
    console.log('יצאת מחוץ ללוח');
  } // if(Object.keys(newLocation).length !==0){


  return newLocation; // }; 
} // stepDiagonally(location1, 'bl');


function stepOverRow(location, direction) {
  var locations = [];

  if (direction === "f" && location.y !== 8) {
    for (var i = location.y + 1; i <= 8; i++) {
      locations.push({
        X: location.x,
        y: i
      });
    }
  } else if (direction === "r" && location.x !== 8) {
    for (var _i = location.x + 1; _i <= 8; _i++) {
      locations.push({
        X: _i,
        y: location.y
      });
    }
  } else if (direction === "b" && location.y !== 1) {
    for (var _i2 = location.y - 1; 0 < _i2; _i2--) {
      locations.push({
        X: location.x,
        y: _i2
      });
    }
  } else if (direction === "l" && location.x !== 1) {
    for (var _i3 = location.x - 1; 0 < _i3; _i3--) {
      locations.push({
        X: _i3,
        y: location.y
      });
    }
  } else {
    console.log('יצאת מחוץ ללוח');
  } // console.log(locations);


  if (locations) {
    return locations;
  }

  ; // return locations;
} // stepOverRow(location1,'f');


function stepOverDiagonalRow(location, direction) {
  var locations = [];
  var newLocation = location;

  if (direction === "fr" && location.y !== 8 && location.x !== 8) {
    for (var i = location.y; i < 8; i++) {
      newLocation = stepDiagonally(newLocation, direction);
      locations.push(newLocation);
    }
  } else if (direction === "br" && location.y !== 1 && location.x !== 8) {
    for (var _i4 = location.x + 1; _i4 <= 8; _i4++) {
      newLocation = stepDiagonally(newLocation, direction);
      locations.push(newLocation);
    }
  } else if (direction === "bl" && location.y !== 1 && location.x !== 1) {
    for (var _i5 = location.y - 1; 0 < _i5; _i5--) {
      newLocation = stepDiagonally(newLocation, direction);
      locations.push(newLocation);
    }
  } else if (direction === "fl" && location.y !== 8 && location.x !== 1) {
    for (var _i6 = location.x - 1; 0 < _i6 - 1; _i6--) {
      newLocation = stepDiagonally(newLocation, direction);
      locations.push(newLocation);
    }
  } else {
    console.log('יצאת מחוץ ללוח');
  } // console.log(locations);
  // return locations;


  if (locations) {
    return locations;
  }

  ;
} // stepOverDiagonalRow(location1, 'fl')


function checkOptionalmovements(type, location) {
  var optionalmovements = [];

  if (type == 'rook') {
    var f = stepOverRow(location, 'f');
    var r = stepOverRow(location, 'r');
    var b = stepOverRow(location, 'b');
    var l = stepOverRow(location, 'l');
    optionalmovements = f.concat(r, b, l);
  } else if (type == 'bishop') {
    var fr = stepOverDiagonalRow(location, 'fr');
    var br = stepOverDiagonalRow(location, 'br');
    var bl = stepOverDiagonalRow(location, 'bl');
    var fl = stepOverDiagonalRow(location, 'fl');
    optionalmovements = fr.concat(br, bl, fl);
    optionalmovements = optionalmovements.filter(function (obg) {
      return Object.keys(obg).length !== 0 && obg.x == obg.x;
    });
  } else if (type == 'pawn') {
    var newLocation;

    if (location.y == 2) {
      newLocation = stepStraight(location, 'f');
      optionalmovements.push(newLocation);
      newLocation = stepStraight(newLocation, 'f');
      optionalmovements.push(newLocation);
    } else {
      optionalmovements.push(stepStraight(location, 'f'));
    }
  } else if (type == 'knight') {
    var _newLocation;

    _newLocation = stepStraight(location, 'f');
    optionalmovements.push(stepDiagonally(_newLocation, 'fr'), stepDiagonally(_newLocation, 'fl'));
    _newLocation = stepStraight(location, 'r');
    optionalmovements.push(stepDiagonally(_newLocation, 'fr'), stepDiagonally(_newLocation, 'br'));
    _newLocation = stepStraight(location, 'b');
    optionalmovements.push(stepDiagonally(_newLocation, 'br'), stepDiagonally(_newLocation, 'bl'));
    _newLocation = stepStraight(location, 'l');
    console.log(_newLocation);
    optionalmovements.push(stepDiagonally(_newLocation, 'bl'), stepDiagonally(_newLocation, 'fl'));
    optionalmovements = optionalmovements.filter(function (obg) {
      return Object.keys(obg).length !== 0 && obg.x == obg.x;
    });
  } else if (type == 'queen') {
    var _f = stepOverRow(location, 'f');

    var _r = stepOverRow(location, 'r');

    var _b = stepOverRow(location, 'b');

    var _l = stepOverRow(location, 'l');

    var _fr = stepOverDiagonalRow(location, 'fr');

    var _br = stepOverDiagonalRow(location, 'br');

    var _bl = stepOverDiagonalRow(location, 'bl');

    var _fl = stepOverDiagonalRow(location, 'fl'); // optionalmovements.push(f,r,b,l,br,bl,fl);


    optionalmovements = _f.concat(_r, _b, _l, _fr, _br, _bl, _fl);
    optionalmovements = optionalmovements.filter(function (obg) {
      return Object.keys(obg).length !== 0 && obg.x == obg.x;
    });
  } else if (type == 'king') {
    var _f2 = stepStraight(location, 'f');

    var _r2 = stepStraight(location, 'r');

    var _b2 = stepStraight(location, 'b');

    var _l2 = stepStraight(location, 'l');

    var _fr2 = stepDiagonally(location, 'fr');

    var _br2 = stepDiagonally(location, 'br');

    var _bl2 = stepDiagonally(location, 'bl');

    var _fl2 = stepDiagonally(location, 'fl');

    optionalmovements.push(_f2, _r2, _b2, _l2, _fr2, _br2, _bl2, _fl2);
    optionalmovements = optionalmovements.filter(function (obg) {
      return obg && Object.keys(obg).length !== 0;
    });
  }

  console.log(optionalmovements);
}

checkOptionalmovements('queen', location1);