export class Ship {
    constructor(length) {
        this.length = length;
    }

    hitsTaken = 0;

    hit() {
        this.hitsTaken++;
    }

    isSunk() {
        return this.length === this.hitsTaken;
    }
}

export class Gameboard {

  constructor(shipClass) {
    try {
      new shipClass();
    } catch {
      return null;
    }
    this.initializeBoard();
    this.shipClass = shipClass;
    this.fleet = this.initializeFleet();
  }

  boardMaxSize = [10, 10];

  board = null;

  hitBoard = null;

  createArray(arraySize) {
    return Array.from( {length: arraySize}, () => null);
  }

  initializeBoard() {
    this.board = Array.from( {length: this.boardMaxSize[0]}, () => this.createArray(this.boardMaxSize[1]));
    this.hitBoard = Array.from( {length: this.boardMaxSize[0]}, () => this.createArray(this.boardMaxSize[1]));
  }

  fleetBlueprint = [5, 4, 3, 3, 2]; //The numbers in this array each represent a ship and the value of the number is the length of that ship

  initializeFleet() {
    return this.fleetBlueprint.map(length => {
      return new this.shipClass(length);
    });
  }

  axisVector = {
    'x': [1, 0],
    'y': [0, 1]
  }

  shipExistAt(x, y) {
    return this.board[x][y] !== null;
  }

  canPlaceShip(shipLength, coordinates, axisVector) {

    let [x, y] = coordinates;

    for(let i = 0; i < shipLength; i++) {
      if(!this.isValidCoordinate(x, y)) return false;
      if(this.shipExistAt(x, y)) {
        return false;
      }

      x += axisVector[0];
      y += axisVector[1];
    }
    return true;
  }

  placeShip(shipObj, startCoordinates, orientation) {

    let axis = null;
    let [x, y] = startCoordinates;

    if(orientation === 'x' || orientation === 'y') {
      axis = this.axisVector[orientation];
    } else {
      axis = this.axisVector.x;
    }

    if(!this.canPlaceShip(shipObj.length, startCoordinates, axis)) return null;

    for(let i = 0; i < shipObj.length; i++) {
      this.board[x][y] = shipObj;
      x += axis[0];
      y += axis[1];
    }

    return shipObj;
  }

  isValidCoordinate(x, y) {
    if(x < 0 || y < 0) return false;
    if(x >= this.boardMaxSize[0] || y >= this.boardMaxSize[1]) return false;
    return true;
  }

  ATTACK_RESULTS = {
    HIT: "hit",
    MISS: "miss",
    INVALID: "invalid"
  }

  receiveAttack(x, y) {

    let attackResultObject = {
      attackResult: null,
      isFleetSunk: false,
      hitShipSunk: false
    };

    if((!this.isValidCoordinate(x, y)) || this.alreadyHit(x, y)) {
      attackResultObject.attackResult = this.ATTACK_RESULTS.INVALID;
      return attackResultObject
    }

    if(this.shipExistAt(x, y)) {
      const hitShip = this.board[x][y];
      hitShip.hit();
      

      attackResultObject.isFleetSunk = this.isAllSunk();
      attackResultObject.attackResult = this.ATTACK_RESULTS.HIT;
      attackResultObject.hitShipSunk = hitShip.isSunk();

    } else {
      attackResultObject.attackResult = this.ATTACK_RESULTS.MISS;
    }

    this.recordHit(x, y, attackResultObject.attackResult);
    return attackResultObject;
  }

  alreadyHit(x, y) {
    return this.hitBoard[x][y] !== null;
  }

  recordHit(x, y, attackResult) {
    this.hitBoard[x][y] = {
      result: attackResult
    }
  }

  isAllSunk() {
    for (let i = 0; i < this.fleet.length; i++) {
      if(!this.fleet[i].isSunk()) return false;
    }
    return true;
  }
}

export class Player {
  constructor(gameBoardObject) {
    this.gameBoard = gameBoardObject;
  }

  
}