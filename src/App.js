import Button from "./components/Button/Button";
import Gameboard from "./components/Gameboard/Gameboard";
import Report from "./components/Report/Report";

function App() {
    return (
        <div className="container">
            <h1>Battleship</h1>
            <Report />
            <div className="control-buttons">
                <Button className="rotate" name={"Rotate"} />
                <Button className="reset" name={"Reset"} />
            </div>

            <Gameboard />
        </div>
    );
}

export default App;
