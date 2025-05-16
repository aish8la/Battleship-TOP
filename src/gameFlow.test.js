import * as gameFlow from './gameFlow.js';

test("Initialize Human Player", () => {
    const humanPlayer1 = gameFlow.initHumanPlayer("Human1");
    expect(humanPlayer1.playerName).toBe("Human1");
    expect(humanPlayer1.gameBoard).toBeDefined();
});

test("Two Players have two different gameBoards", () => {
    const player1 = gameFlow.initHumanPlayer("Human1");
    const player2 = gameFlow.initHumanPlayer("Human2");
    expect(player1.playerName).toBe("Human1");
    expect(player2.playerName).toBe("Human2");
    expect(player1).not.toBe(player2);
    expect(player1.gameBoard).not.toBe(player2.gameBoard);
});