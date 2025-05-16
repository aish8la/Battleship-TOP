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

  initLocationList() {
    const list = [];
    const [maxX, maxY] = this.boardMaxSize;
    let x, y;
    let i = 0;
    for(x = 0; x < maxX; x++) {
      for (y = 0; y < maxY; y++) {
        list[i] = [x, y];
        i++;
      }
    }
    return list;
  }
}

export const PLAYER_TYPES = {
    COMPUTER: "computer",
    HUMAN: "human"
}
export class Player {
  constructor(type = PLAYER_TYPES.COMPUTER, playerName, gameBoardObject) {
    this.gameBoard = gameBoardObject;
    this.type = type;
    this.playerName = playerName;
    this.initUnplacedShips();
  }

  unplacedShips = []

  initUnplacedShips() {
    this.unplacedShips = [...this.gameBoard.fleet];
  }

  placeShipOnBoard(coordinate, orientation, shipIndex = 0) {

    const currentShip = this.unplacedShips[shipIndex];
    if(!currentShip) return null;
    const resultOfPlacement = this.gameBoard.placeShip(currentShip, coordinate, orientation);
    if(!resultOfPlacement) return null;
    this.unplacedShips.splice(shipIndex, 1);
  }

  receiveAttackFromEnemy(coordinateArr) {
    const [x, y] = coordinateArr;
    return this.gameBoard.receiveAttack(x, y);
  }

  placementList = [];

  initPlacementList() {
    this.placementList = this.gameBoard.initLocationList();
  }

  shuffleList(list) {
    let numOfUnshuffled = list.length;
    let randomIndex, temp;
    
    while(numOfUnshuffled) {
      randomIndex = Math.floor(Math.random() * numOfUnshuffled);
      numOfUnshuffled--;

      temp = list[numOfUnshuffled];
      list[numOfUnshuffled] = list[randomIndex];
      list[randomIndex] = temp;
    }
  }

  shufflePlacementList() {
    this.shuffleList(this.placementList);
  }
  

}