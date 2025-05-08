import * as gameClass from './app.js';

test("Ship Class exists", () => {
    expect(gameClass.Ship).toBeDefined();
});

test("Ship Instance has length", () => {
    const shipObject = new gameClass.Ship(4);
    expect(shipObject.length).toBeDefined();
    expect(shipObject.length).toBe(4);
})