import GameContext from "../../context/GameContext";
import { useContext } from "react";

const Report = () => {
    const { reportText } = useContext(GameContext);

    return <div className="report">{reportText}</div>;
};

export default Report;
