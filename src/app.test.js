import * as gameClass from './app.js';

test("Ship Class exists", () => {
    expect(gameClass.Ship).toBeDefined();
});

test("Ship Instance has length", () => {
    const shipObject = new gameClass.Ship(4);
    expect(shipObject.length).toBeDefined();
    expect(shipObject.length).toBe(4);
});

test("Ship Instance has hitsTaken", () => {
    const shipObject = new gameClass.Ship(4);
    expect(shipObject.hitsTaken).toBeDefined();
});

test("Ship Instance hitsTaken is 0", () => {
    const shipObject = new gameClass.Ship(4);
    expect(shipObject.hitsTaken).toBe(0);
});

test("Ship initializes with hit method", () => {
    const shipObject = new gameClass.Ship(4);
    expect(shipObject.hit).toBeDefined();
});

test("Ship initializes with hit method", () => {
    const shipObject = new gameClass.Ship(4);
    expect(shipObject.hit).toBeDefined();
    expect(typeof shipObject.hit).toBe("function");
});

test("Ship hit method call increases hitsTaken by 1", () => {
    const shipObject = new gameClass.Ship(4);
    shipObject.hit();
    expect(shipObject.hitsTaken).toBe(1);
    shipObject.hit();
    expect(shipObject.hitsTaken).toBe(2);
});

test("Ship initializes with isSunk method", () => {
    const shipObject = new gameClass.Ship(4);
    expect(shipObject.isSunk).toBeDefined();
    expect(typeof shipObject.hit).toBe("function");
});

test("Ship isSunk returns true if hitsTaken and length are equal", () => {
    const shipObject = new gameClass.Ship(4);
    expect(shipObject.isSunk()).toBe(false);
    shipObject.hit();
    shipObject.hit();
    shipObject.hit();
    shipObject.hit();
    expect(shipObject.isSunk()).toBe(true);
});

test("Gameboard Class exists", () => {
    expect(gameClass.Gameboard).toBeDefined();
});

test("Board initializes with board array", () => {
    const gameBoard = new gameClass.Gameboard(gameClass.Ship);
    expect(gameBoard).not.toBeNull();
    expect(gameBoard.board).toBeDefined();
    expect(Array.isArray(gameBoard.board)).toBe(true);
    expect(gameBoard.board.length).toBe(10);
    expect(gameBoard.board[9].length).toBe(10);
});

test("Board initializes with fleet array", () => {
    const gameBoard = new gameClass.Gameboard(gameClass.Ship);
    expect(gameBoard.fleet).toBeDefined();
    expect(Array.isArray(gameBoard.fleet)).toBe(true);
    expect(gameBoard.fleet.length).toBe(5);
    expect(gameBoard.fleet[4].length).toBe(2);
});

test("Place first ship horizontally from coordinate 0,0", () => {
    const gameBoard = new gameClass.Gameboard(gameClass.Ship);
    const firstShip = gameBoard.fleet[0];
    const result = gameBoard.placeShip(firstShip, [0,0], 'x');
    expect(result).not.toBeNull();
    expect(result).toBe(firstShip);
    expect(gameBoard.board[0][0]).toBe(firstShip);
    expect(gameBoard.board[1][0]).toBe(firstShip);
    expect(gameBoard.board[2][0]).toBe(firstShip);
    expect(gameBoard.board[3][0]).toBe(firstShip);
    expect(gameBoard.board[4][0]).toBe(firstShip);
    expect(gameBoard.board[5][0]).toBeNull();
});

test("Place Ship Coordinate Validation", () => {
    const gameBoard = new gameClass.Gameboard(gameClass.Ship);
    const firstShip = gameBoard.fleet[0];
    let result = gameBoard.placeShip(firstShip, [9,0], 'x');
    expect(result).toBeNull();
    result = gameBoard.placeShip(firstShip, [0,9], 'y');
    expect(result).toBeNull();
    result = gameBoard.placeShip(firstShip, [0,0], 'y');
    expect(result).toBe(firstShip);
    const secondShip = gameBoard.fleet[1];
    result = gameBoard.placeShip(secondShip, [0,4], 'y');
    expect(result).toBeNull();
    expect(gameBoard.board[0][4]).toBe(firstShip);
    result = gameBoard.placeShip(secondShip, [0,5], 'y');
    expect(result).not.toBeNull();
    expect(result).toBe(secondShip);
});

test("Receive Attack", () => {
    const gameBoard = new gameClass.Gameboard(gameClass.Ship);
    const firstShip = gameBoard.fleet[0];
    gameBoard.placeShip(firstShip, [9,0], 'y');
    let result = gameBoard.receiveAttack(9, 2);
    expect(result.attackResult).toBe("hit");
    result = gameBoard.receiveAttack(9, 2);
    expect(result.attackResult).toBe("invalid");
    expect(firstShip.hitsTaken).toBe(1);
    result = gameBoard.receiveAttack(0, 2);
    expect(result.attackResult).toBe("miss");
});

test("Receive Attack", () => {
    const gameBoard = new gameClass.Gameboard(gameClass.Ship);
    const firstShip = gameBoard.fleet[0];
    gameBoard.placeShip(firstShip, [9,0], 'y');
    for(let i = 0; i < firstShip.length; i++) {
        expect(firstShip.isSunk()).toBe(false);
        gameBoard.receiveAttack(9, i);
    }
    expect(firstShip.isSunk()).toBe(true);
});

test("All ship sunk", () => {
    const gameBoard = new gameClass.Gameboard(gameClass.Ship);
    const shipPlacements = [
        [0, 0, 'x'], // ship of length 5 (horizontal, starts at top-left)
        [2, 2, 'y'], // ship of length 4 (vertical)
        [5, 0, 'x'], // ship of length 3 (horizontal)
        [7, 4, 'y'], // ship of length 3 (vertical)
        [8, 9, 'x'], // ship of length 2 (horizontal, safe at bottom-right edge)
    ];

    for(let i = 0; i < gameBoard.fleet.length; i++) {
        const [x, y, orientation] = shipPlacements[i];
        const placementResult = gameBoard.placeShip(gameBoard.fleet[i], [x,y], orientation);
        expect(placementResult).toBe(gameBoard.fleet[i]);
    }

    const attackCoordinates = [
        // Ship 1: [0,0] to [4,0]
        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
      
        // Ship 2: [2,2] to [2,5]
        [2, 2], [2, 3], [2, 4], [2, 5],
      
        // Ship 3: [5,0] to [7,0]
        [5, 0], [6, 0], [7, 0],
      
        // Ship 4: [7,4] to [7,6]
        [7, 4], [7, 5], [7, 6],
      
        // Ship 5: [8,9] to [9,9]
        [8, 9], [9, 9],
    ];

    let attackResult = [];
    attackCoordinates.forEach(attack => {
        const [x, y] = attack;
        attackResult.push(gameBoard.receiveAttack(x, y));
        expect(attackResult[attackResult.length - 1].attackResult).toBe('hit');
    });

    expect(attackResult[attackResult.length - 1].isFleetSunk).toBe(true);

});

test("Player Object Initializes with gameBoard Object", () => {
    const gameBoard = new gameClass.Gameboard(gameClass.Ship);
    const player = new gameClass.Player(gameClass.PLAYER_TYPES.HUMAN, 'Player 1',gameBoard);
    expect(player).not.toBeNull();
    expect(player.gameBoard).toBeDefined();
    expect(player.gameBoard).toBe(gameBoard);
    expect(player.type).toBe('human');
    expect(player.playerName).toBe('Player 1');
});