import * as gameFlow from "./gameFlow.js";
import * as displayControllers from "./displayerController.js";

const body = document.querySelector('body');

export function initializeEventListeners() {
    body.addEventListener('click', (e) => {
        if(e.target.id === "single-player") {
            gameFlow.startSinglePlayerGame();
            displayControllers.updateDisplay();
        }
        if(e.target.id === "two-player") {
            gameFlow.start2PlayerGame();
            displayControllers.updateDisplay();
        }
        if(e.target.id === "confirm") {
            gameFlow.confirmPlacement();
            displayControllers.updateDisplay();
        }
        
    });

    body.addEventListener('click', (e) => {
        if(e.target.id === "randomize") {
            gameFlow.randomizePlacement();
            displayControllers.updatePlacement()
        }
    });
}
