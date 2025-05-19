import * as gameFlow from "./gameFlow.js";

test("Initialize Human Player", () => {
  gameFlow.startSinglePlayerGame("Human1");
  expect(gameFlow.gameState.player1.playerName).toBe("Human1");
  expect(gameFlow.gameState.player1).toBeDefined();
});

test("Two Players have two different gameBoards", () => {
  gameFlow.start2PlayerGame("Human1", "Human2");
  expect(gameFlow.gameState.player1.playerName).toBe("Human1");
  expect(gameFlow.gameState.player2.playerName).toBe("Human2");
  expect(gameFlow.gameState.player1).not.toBe(gameFlow.gameState.player2);
  expect(gameFlow.gameState.player1.gameBoard).not.toBe(
    gameFlow.gameState.player2.gameBoard,
  );
});
