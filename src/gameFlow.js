import { Ship } from "./app.js";
import { Gameboard } from "./app.js";
import { Player } from "./app.js";
import { PLAYER_TYPES } from "./app.js";
import { pubsub } from "./pubsub.js";

export const gameState = {
  player1: null,
  player2: null,
  currentTurn: null,
  shipsPlaced: {
    player1: false,
    player2: false,
  },
  currentState: null,
  currentBoard: null,
};

const PLAYERS = {
  PLAYER1: "player1",
  PLAYER2: "player2",
};

const TARGET = {
  player1: PLAYERS.PLAYER2,
  player2: PLAYERS.PLAYER1,
};

export const STATE = {
  SHIP_PLACEMENT: "shipPlacement",
  GAME_PLAY: "gamePlay",
  GAME_OVER: "gameOver",
};

function initGameboard() {
  return new Gameboard(Ship);
}

function initHumanPlayer(humanName) {
  const gameBoard = initGameboard();
  return new Player(PLAYER_TYPES.HUMAN, humanName, gameBoard);
}

function initComputerPlayer() {
  const gameBoard = initGameboard();
  return new Player(PLAYER_TYPES.COMPUTER, "Computer", gameBoard);
}

export function startSinglePlayerGame(player1Name = "Player 1") {
  gameState.player1 = initHumanPlayer(player1Name);
  gameState.player2 = initComputerPlayer();
  gameState.player2.randomPlacement();
  gameState.shipsPlaced.player2 = true;
  gameState.currentBoard = PLAYERS.PLAYER1;
  shipPlacementHandler();
}

export function start2PlayerGame(
  player1Name = "Player 1",
  player2Name = "Player 2",
) {
  gameState.player1 = initHumanPlayer(player1Name);
  gameState.player2 = initHumanPlayer(player2Name);
  shipPlacementHandler();
}

function shipPlacementHandler() {
  if (gameState.currentState === null)
    gameState.currentState = STATE.SHIP_PLACEMENT;
  if (!gameState.shipsPlaced[PLAYERS.PLAYER1]) {
    gameState.currentTurn = PLAYERS.PLAYER1;
  } else if (!gameState.shipsPlaced[PLAYERS.PLAYER2]) {
    gameState.currentTurn = PLAYERS.PLAYER2;
  } else {
    startGame();
  }
}

export function confirmPlacement() {
  const current = gameState.currentTurn;
  const player = gameState[current];
  if (!player.isAllShipsPlaced()) return;
  gameState.shipsPlaced[current] = true;
  shipPlacementHandler();
}

function startGame() {
  gameState.currentState = STATE.GAME_PLAY;
  gameState.currentTurn = PLAYERS.PLAYER1;
  return;
}

function computerTurn() {
  const currentPlayer = gameState[gameState.currentTurn];
  if (currentPlayer.type === PLAYER_TYPES.COMPUTER) {
    const coordinates = currentPlayer.computerAttack();
    attackEnemy(coordinates);
  }
}

function switchTurn() {
  if (gameState.currentTurn === PLAYERS.PLAYER1) {
    gameState.currentTurn = PLAYERS.PLAYER2;
  } else {
    gameState.currentTurn = PLAYERS.PLAYER1;
  }
  if (gameState[gameState.currentTurn].type !== PLAYER_TYPES.COMPUTER) {
    gameState.currentBoard = gameState.currentTurn;
  }
  computerTurn();
}

export function attackEnemy(coordinate) {
  const target = TARGET[gameState.currentTurn];
  const receivingPlayer = gameState[target];
  const result = receivingPlayer.receiveAttackFromEnemy(coordinate);
  if (result.attackResult !== "invalid" && !result.isFleetSunk) {
    pubsub.publish("updateBoard", "");
    switchTurn();
  } else if (result.isFleetSunk) {
    gameState.currentState = STATE.GAME_OVER;
    pubsub.publish("updateDisplay", "");
  }
  return result;
}

export function getBoardData() {
  const data = {
    ownBoard: null,
    enemyHitBoard: null,
  };

  const currentPlayer = gameState.currentBoard;
  data.ownBoard = gameState[currentPlayer].gameBoard.getOwnBoard();
  data.enemyHitBoard =
    gameState[TARGET[currentPlayer]].gameBoard.getPublicView();
  return data;
}

export function placementData() {
  const currentPlayer = gameState.currentBoard;
  const data = gameState[currentPlayer].gameBoard.getOwnBoard();
  return data;
}

export function randomizePlacement() {
  const currentPlayer = gameState.currentTurn;
  return gameState[currentPlayer].randomPlacement();
}
