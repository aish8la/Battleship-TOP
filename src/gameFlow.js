import { Ship } from './app.js';
import { Gameboard } from './app.js';
import { Player } from './app.js';
import { PLAYER_TYPES } from './app.js';

export const gameState = {
    player1: null,
    player2: null,
}

function initGameboard() {
    return new Gameboard(Ship);
}

export function initHumanPlayer(humanName) {
    const gameBoard = initGameboard();
    return new Player(PLAYER_TYPES.HUMAN, humanName, gameBoard);
}

export function initComputerPlayer() {
    const gameBoard = initGameboard();
    return new Player(PLAYER_TYPES.COMPUTER, "Computer", gameBoard);
}

export function startSinglePlayerGame(player1Name = "Player 1") {
    gameState.player1 = initHumanPlayer(player1Name);
    gameState.player2 = initComputerPlayer();
}

export function start2PlayerGame(player1Name = "Player 1", player2Name = "Player 2") {
    gameState.player1 = initHumanPlayer(player1Name);
    gameState.player2 = initHumanPlayer(player2Name);
}