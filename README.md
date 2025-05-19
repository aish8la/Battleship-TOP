# 🎯 Battleship Game

A web-based Battleship game built using JavaScript, HTML, and CSS as part of [The Odin Project](https://www.theodinproject.com/) curriculum. This implementation features a playable single-player mode with a modular architecture and dynamic UI updates powered by Webpack.

---

## 🚀 Features

- **Single Player Mode** – Play against a basic computer opponent.
- **Random Ship Placement** – Ships are placed randomly without overlaps or out-of-bound errors.
- **Turn-Based Gameplay** – Players alternate turns attacking each other's grids.
- **Endgame Detection** – Automatically declares the winner when a fleet is destroyed.
- **Dynamic UI** – Renders game screens and boards dynamically based on the game state.
- **Visual Feedback** – Distinct styles for hits, misses, and sunk ships.
- **Pub-Sub Architecture** – Decouples UI rendering from game logic for easier maintenance.
- **Fully Modular Codebase** – Clean separation of responsibilities across modules.

---

## 🧩 Project Structure

```

├── src/
│   ├── app.js                # Game logic: Ship, Gameboard, Player
│   ├── gameFlow\.js           # Orchestrates game state and transitions
│   ├── displayerController.js # Renders UI and updates game board
│   ├── UIController.js       # Sets up user interaction event listeners
│   ├── pubsub.js             # Pub-Sub system for event messaging
│   ├── index.js              # Entry point
│   ├── index.html            # Main HTML template
│   └── style.css             # Styling for layout and game boards

````

---

## ⚙️ Development & Build Setup

This project uses a custom **Webpack 5** template to manage assets and streamline development.

### 📦 Install Dependencies

```bash
npm install
````

### 🔧 Available Scripts

```json
"scripts": {
  "start": "webpack serve --open --config webpack.dev.js",
  "build": "webpack --config webpack.prod.js",
  "lint": "eslint .",
  "format": "prettier --write ."
}
```

| Script   | Description                         |
| -------- | ----------------------------------- |
| `start`  | Launches the development server     |
| `build`  | Generates a production-ready bundle |
| `lint`   | Runs ESLint for code quality checks |
| `format` | Formats code using Prettier         |

### 🚀 Build for Production

```bash
npm run build
```

This generates a bundled version of the app in the `dist/` directory, ready to be deployed on any static web host.

---

## 🧠 Game Rules

* Each player has a 10×10 grid and five ships (lengths: 5, 4, 3, 3, 2).
* Players take turns choosing coordinates to attack.
* Hits, misses, and sunk ships are visually represented.
* The first player to sink all opponent ships wins.

---

## 📝 To-Do / Incomplete Features

The following features were considered but are not yet implemented:

* [ ] **Drag-and-Drop Ship Placement**
* [ ] **2-Player Local Mode** (hot seat on same machine)
* [ ] **Smarter Computer AI** (targeting adjacent cells after a hit)
* [ ] **Manual Ship Placement with Clicks**
* [ ] **Messages indicating state of game**
* [ ] **Game Reset Button / Replay Flow**

These features may be explored in future iterations.

---

## 👤 Author

**Aish Waheed**
*Student at [The Odin Project](https://www.theodinproject.com/)*

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
