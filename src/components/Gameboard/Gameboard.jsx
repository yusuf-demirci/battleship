import Box from "../Box/Box";
import GameContext from "../../context/GameContext";
import { useContext } from "react";

const Gameboard = () => {
    const { boxList, handleMouseOver, handleMouseClick } =
        useContext(GameContext);

    return (
        <div className="gameboard">
            {boxList.map((item, index) => (
                <Box
                    key={index}
                    num={index}
                    funcOver={handleMouseOver}
                    funcClick={handleMouseClick}
                    status={item.status}
                    bgColor={item.bgColor}
                />
            ))}
        </div>
    );
};

export default Gameboard;
