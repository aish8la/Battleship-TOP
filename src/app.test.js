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
    const gameBoard = new gameClass.Gameboard();
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