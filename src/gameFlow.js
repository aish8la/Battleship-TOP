import { Ship } from './app.js';
import { Gameboard } from './app.js';
import { Player } from './app.js';
import { PLAYER_TYPES } from './app.js';

export const gameState = {
    player1: null,
    player2: null,
    currentTurn: null,
    shipsPlaced: {
        player1:false,
        player2:false
    },
    currentState: null,
}

const PLAYERS = {
    PLAYER1: 'player1',
    PLAYER2: 'player2'
}

const TARGET = {
    player1: PLAYERS.PLAYER2,
    player2: PLAYERS.PLAYER1 
}

export const STATE = {
    SHIP_PLACEMENT: 'shipPlacement',
    GAME_PLAY: 'gamePlay',
    GAME_OVER: 'gameOver'
}

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
    shipPlacementHandler();
}

export function start2PlayerGame(player1Name = "Player 1", player2Name = "Player 2") {
    gameState.player1 = initHumanPlayer(player1Name);
    gameState.player2 = initHumanPlayer(player2Name);
    shipPlacementHandler();
}

function shipPlacementHandler() {
    if(gameState.currentState === null) gameState.currentState = STATE.SHIP_PLACEMENT;
    if(!gameState.shipsPlaced[PLAYERS.PLAYER1]) {
        gameState.currentTurn = PLAYERS.PLAYER1;
    } else if(!gameState.shipsPlaced[PLAYERS.PLAYER2]){
        gameState.currentTurn = PLAYERS.PLAYER2;
    } else {
        startGame();
    }
}

export function confirmPlacement() {
    const current = gameState.currentTurn;
    const player = gameState[current];
    if(!player.isAllShipsPlaced()) return;
    gameState.shipsPlaced[player] = true;
    shipPlacementHandler();
}

function startGame() {
    gameState.currentState = STATE.GAME_PLAY;
    const player = randomPlayer();
    gameState.currentTurn = PLAYERS[player];
    return
}

function computerTurn() {
    const currentPlayer = gameState[gameState.currentTurn];
    if(currentPlayer.type === PLAYER_TYPES.COMPUTER) {
        const coordinates = currentPlayer.computerAttack();
        attackEnemy(coordinates);
    }
}

function switchTurn() {
    gameState.currentTurn = gameState.currentTurn === PLAYERS.PLAYER1 ? PLAYERS.PLAYER2 : PLAYERS.PLAYER1;
    computerTurn();
}

export function attackEnemy(coordinate) {
    const receivingPlayer = TARGET[gameState.currentTurn];
    const result = receivingPlayer.receiveAttackFromEnemy(coordinate);
    if(result.attackResult !== "invalid" && !result.isFleetSunk) {
        switchTurn();
    } else if(result.isFleetSunk) {
        gameState.currentState = STATE.GAME_OVER;
    }
    return result;
}

export function getBoardData() {
    const data = {
        ownBoard: null,
        enemyHitBoard: null,
    }

    const currentPlayer = gameState.currentTurn
    data.ownBoard = gameState[currentPlayer].gameBoard.getOwnBoard();
    data.enemyHitBoard = gameState[TARGET[currentPlayer]].gameBoard.getPublicView();
    return data;
}

export function placementData() {
    const currentPlayer = gameState.currentTurn
    const data = gameState[currentPlayer].gameBoard.getOwnBoard();
    return data;
}

function randomPlayer() {
    const randomNum = Math.floor(Math.random() * 2) + 1;
    return `PLAYER${randomNum}`;
}

export function randomizePlacement() {
    const currentPlayer = gameState.currentTurn
    return gameState[currentPlayer].randomPlacement();
}