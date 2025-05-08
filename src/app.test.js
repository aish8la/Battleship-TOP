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