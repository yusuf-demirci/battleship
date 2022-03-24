import React from "react";
import ReactDOM from "react-dom";
import "./scss/main.scss";
import App from "./App";
import { GameProvider } from "./context/GameContext";

ReactDOM.render(
    <React.StrictMode>
        <GameProvider>
            <App />
        </GameProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
