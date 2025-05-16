import { Ship } from './app.js';
import { Gameboard } from './app.js';
import { Player } from './app.js';
import { PLAYER_TYPES } from './app.js';

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
