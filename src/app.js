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
    this.initializeBoard();
    this.shipClass = shipClass;
    this.fleet = this.initializeFleet();
  }

  boardMaxSize = [10, 10];

  board = null;

  createArray(arraySize) {
    return Array.from( {length: arraySize}, () => null);
  }

  initializeBoard() {
    this.board = Array.from( {length: this.boardMaxSize[1]}, () => this.createArray(this.boardMaxSize[0]));
  }

  fleetBlueprint = [5, 4, 3, 3, 2]; //The numbers in this array each represent a ship and the value of the number is the length of that ship

  initializeFleet() {
    return this.fleetBlueprint.map(length => {
      return new this.shipClass(length);
    });
  }
}