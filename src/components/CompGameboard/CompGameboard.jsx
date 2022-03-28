import GameContext from "../../context/GameContext";
import { useContext } from "react";
import Gameboard from "../Gameboard/Gameboard";

const CompGameboard = () => {
    const { compBoxList, handleMouseOverComp } = useContext(GameContext);

    return (
        <Gameboard
            className="comp-board"
            boxList={compBoxList}
            funcOver={handleMouseOverComp}
            // funcClick={}
        />
    );
};

export default CompGameboard;
