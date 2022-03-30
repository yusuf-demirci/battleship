import Gameboard from "../Gameboard/Gameboard";
import GameContext from "../../context/GameContext";
import { useContext } from "react";

const UserGameboard = () => {
    const { userBoxList, handleMouseOverUser, handleMouseClickUser, gameStatus } =
        useContext(GameContext);

    return (
        <Gameboard
            className={gameStatus !== "deploy" && "user-board"}
            boxList={userBoxList}
            funcOver={handleMouseOverUser}
            funcClick={handleMouseClickUser}
        />
    );
};

export default UserGameboard;
