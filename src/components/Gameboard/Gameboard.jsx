import Box from "../Box/Box"

const Gameboard = ({boxList, funcOver, funcClick, className}) => {
    return (
        <div className={`gameboard ${className}`}>
            {boxList
                .map((item, index) => (
                    <Box
                        key={index}
                        num={index}
                        funcOver={funcOver}
                        funcClick={funcClick}
                        status={item.status}
                        bgColor={item.bgColor}
                    />
                ))}
        </div>
    );
};

export default Gameboard;

// import Box from "../Box/Box";
// import GameContext from "../../context/GameContext";
// import { useContext } from "react";

// const Gameboard = () => {
//     const { boxList, gameStatus, handleMouseOver, handleMouseClick } =
//         useContext(GameContext);

//     return (
//         <div className={`gameboard ${gameStatus === 'play' && 'play-game'}`}>
//             {boxList.map((item, index) => (
//                 <Box
//                     key={index}
//                     num={index}
//                     funcOver={handleMouseOver}
//                     funcClick={handleMouseClick}
//                     status={item.status}
//                     bgColor={item.bgColor}
//                 />
//             ))}
//         </div>
//     );
// };

// export default Gameboard;
