import Button from "./components/Button/Button";
import Report from "./components/Report/Report";
import UserGameboard from "./components/UserGameboard/UserGameboard";
import GameContext from "./context/GameContext";
import { useContext } from "react";
import CompGameboard from "./components/CompGameboard/CompGameboard";

function App() {
    const { handleRotation, gameStatus } = useContext(GameContext);

    return (
        <div className="container">
            <h1>Battleship</h1>
            <Report />
            <div className="control-buttons">
                <Button
                    className="rotate"
                    name={"Rotate"}
                    func={handleRotation}
                />
                <Button className="reset" name={"Reset"} />
            </div>

            {gameStatus !== "deploy" && <CompGameboard />}
            <UserGameboard />
        </div>
    );
}

export default App;
