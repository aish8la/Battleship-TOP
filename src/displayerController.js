import * as gameFlow from "./gameFlow.js";
import { pubsub } from "./pubsub.js";

const elements = {
  body: document.querySelector("body"),
};

function elementGenerator(type, attr = {}, textContent) {
  const newElmt = document.createElement(type);
  newElmt.textContent = textContent;

  for (const key of Object.keys(attr)) {
    newElmt.setAttribute(key, attr[key]);
  }

  return newElmt;
}

function removeElement(selector) {
  const target = elements.body.querySelector(selector);
  if (target) {
    elements.body.removeChild(target);
  }
}

function removeFromParent(parentSelector, target) {
  const parent = document.querySelector(parentSelector);
  const child = parent.querySelector(target);
  if (child && parent) {
    parent.removeChild(child);
  }
}

export function renderHome() {
  removeElement(".wrapper");
  const wrapper = elementGenerator("div", {
    class: "wrapper",
    id: "home-screen",
  });
  const title = elementGenerator("h1", {}, "Battleship");
  const menu = elementGenerator("div", { id: "menu-ctn" });
  const button1 = elementGenerator(
    "button",
    { id: "single-player", class: "home-screen-btn" },
    "Single Player",
  );
  const button2 = elementGenerator(
    "button",
    { id: "two-player", class: "home-screen-btn" },
    "2 Player",
  );

  menu.appendChild(button1);
  menu.appendChild(button2);
  wrapper.appendChild(title);
  wrapper.appendChild(menu);
  elements.body.appendChild(wrapper);
}

function renderBoard(maxSize, data) {
  const [maxX, maxY] = maxSize;
  const gridCtn = elementGenerator("div", { class: "grid-container" });
  for (let x = 0; x <= maxX - 1; x++) {
    for (let y = 0; y <= maxY - 1; y++) {
      let classList = "grid";
      if (data && data[x] && data[x][y] && data[x][y].class) {
        classList += data[x][y].class;
      }
      const grid = elementGenerator("div", {
        class: classList,
        "data-column": y,
        "data-row": x,
      });
      gridCtn.appendChild(grid);
    }
  }
  return gridCtn;
}

export function renderShipPlacement(data) {
  removeElement(".wrapper");
  const wrapper = elementGenerator("div", {
    class: "wrapper",
    id: "game-board",
  });
  const messageBox = elementGenerator(
    "div",
    { id: "message-box" },
    "This is a message box for notifications",
  );
  const gameCtn = elementGenerator("div", {
    class: "ship-placement",
    id: "game-boards",
  });
  const gameBoards = elementGenerator("div", {
    class: "board-container",
    id: "ship-placement",
  });
  const screenTitle = elementGenerator("h3", {}, "Place Ship");
  const board = renderBoard([10, 10], data);

  const menu = elementGenerator("div", { id: "button-ctn" });
  const button1 = elementGenerator(
    "button",
    { id: "toggle-orientation" },
    "Toggle Orientation",
  );
  const button2 = elementGenerator("button", { id: "randomize" }, "Randomize");
  const button3 = elementGenerator(
    "button",
    { id: "confirm" },
    "Confirm Placement",
  );

  menu.appendChild(button1);
  menu.appendChild(button2);
  menu.appendChild(button3);

  gameBoards.appendChild(screenTitle);
  gameBoards.appendChild(board);
  gameCtn.appendChild(gameBoards);
  gameCtn.appendChild(menu);
  wrapper.appendChild(messageBox);
  wrapper.appendChild(gameCtn);
  elements.body.appendChild(wrapper);
}

export function renderGameScreen(data) {
  removeElement(".wrapper");
  const wrapper = elementGenerator("div", {
    class: "wrapper",
    id: "game-board",
  });
  const messageBox = elementGenerator(
    "div",
    { id: "message-box" },
    "This is a message box for notifications",
  );
  const gameCtn = elementGenerator("div", {
    class: "in-game",
    id: "game-boards",
  });
  const playerBoardCtn = elementGenerator("div", {
    class: "board-container",
    id: "player-board",
  });
  const playerBoardTitle = elementGenerator("h3", {}, "Your Board");
  const playerBoard = renderBoard([10, 10], data.ownBoard);

  const enemyBoardCtn = elementGenerator("div", {
    class: "board-container",
    id: "enemy-board",
  });
  const enemyBoardTitle = elementGenerator("h3", {}, "Enemy Board");
  const enemyBoard = renderBoard([10, 10], data.enemyHitBoard);

  playerBoardCtn.appendChild(playerBoardTitle);
  playerBoardCtn.appendChild(playerBoard);
  gameCtn.appendChild(playerBoardCtn);

  enemyBoardCtn.appendChild(enemyBoardTitle);
  enemyBoardCtn.appendChild(enemyBoard);
  gameCtn.appendChild(enemyBoardCtn);

  wrapper.appendChild(messageBox);
  wrapper.appendChild(gameCtn);
  elements.body.appendChild(wrapper);
}

function renderInterruptBox(title, message) {
  removeElement(".wrapper");
  const wrapper = elementGenerator("div", {
    class: "wrapper",
    id: "interrupt",
  });
  const interruptBox = elementGenerator("div", { id: "interrupt-box" });
  const titleElement = elementGenerator("h3", { id: "interrupt-title" }, title);
  const msgElement = elementGenerator(
    "p",
    { id: "interrupt-message" },
    message,
  );

  wrapper.appendChild(interruptBox);
  interruptBox.appendChild(titleElement);
  interruptBox.appendChild(msgElement);
  elements.body.appendChild(wrapper);
}

export function updateBoard(parentID, data) {
  removeFromParent(parentID, ".grid-container");
  const parent = document.querySelector(parentID);
  const newBoard = renderBoard([10, 10], data);
  parent.appendChild(newBoard);
}

export function updatePlacement() {
  const data = gameFlow.placementData();
  updateBoard("#ship-placement", data);
}

export function updateGameBoards() {
  const data = gameFlow.getBoardData();
  updateBoard("#enemy-board", data.enemyHitBoard);
  updateBoard("#player-board", data.ownBoard);
}

export function initDisplay() {
  renderHome();
}

export function updateDisplay() {
  if (gameFlow.gameState.currentState === gameFlow.STATE.SHIP_PLACEMENT) {
    renderShipPlacement({});
  }
  if (gameFlow.gameState.currentState === gameFlow.STATE.GAME_PLAY) {
    const data = gameFlow.getBoardData();
    renderGameScreen(data);
  }
  if (gameFlow.gameState.currentState === gameFlow.STATE.GAME_OVER) {
    const winning = gameFlow.gameState.currentTurn;
    const winnerName = gameFlow.gameState[winning]?.playerName;
    renderInterruptBox("Game Over", `${winnerName} Wins`);
  }
}

pubsub.subscribe("updateDisplay", updateDisplay);
