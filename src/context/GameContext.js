import { createContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [boxList, setBoxList] = useState(
        Array(100).fill({
            state: "empty",
        })
    );

    const handleMouseOver = () => {
        console.log("over");
    };

    return (
        <GameContext.Provider
            value={{
                handleMouseOver,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
