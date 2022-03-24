import Button from "./components/Button/Button";
import Gameboard from "./components/Gameboard/Gameboard";
import Report from "./components/Report/Report";
import GameContext from "./context/GameContext";
import { useContext } from "react";

function App() {
    const { handleRotation } = useContext(GameContext);

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

            <Gameboard />
        </div>
    );
}

export default App;
