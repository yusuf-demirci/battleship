import { createContext, useEffect, useState } from "react";
import { shipList } from "../helper/ships";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [userBoxList, setBoxList] = useState(
        Array(100).fill({
            status: "empty",
            bgColor: "#051367",
            userShip: "empty",
        })
    );
    const [compBoxList, setCompBoxList] = useState(
        Array(100).fill({
            status: "empty",
            bgColor: "#051367",
            compShip: "empty",
        })
    );
    const [userShip, setUserShip] = useState(shipList[0]);
    // const [compShip, setCompShip] = useState(shipList[0]);
    const [rotation, setRotation] = useState(true);
    const [gameStatus, setGameStatus] = useState("play");

    useEffect(() => {
        if (userShip === undefined) {
            setGameStatus("play");
        }
    }, [userShip]);

    useEffect(() => {
        deployCompShips();
    }, []);

    const deployCompShips = () => {
        let fullCoords = [];
        shipList.forEach((ship) => {
            let coords = [];
            while (true) {
                coords = [];
                let coord = Math.floor(Math.random() * 100);
                let rotation = Math.floor(Math.random() * 2);

                if (rotation === 1) {
                    if (
                        (coord % 10) + ship.length <= 10 &&
                        fullCoords.every((num) =>
                            !([coord, coord + 1, coord + 2, coord + 3, coord + 4]
                                .slice(0, ship.length)
                                .includes(num))
                        )
                    ) {
                        for (let i = 0; i < ship.length; i++) {
                            coords.push(coord + i);
                        }
                        break;
                    }
                } else {
                    if ((coord + (ship.length - 1) * 10 <= 99) &&
                        fullCoords.every((num) =>
                            !([coord, coord + 10, coord + 20, coord + 30, coord + 40]
                                .slice(0, ship.length)
                                .includes(num))
                        )) {
                        for (let i = 0; i < ship.length; i++) {
                            coords.push(coord + i * 10);
                        }
                        break;
                    }
                }
            }

            fullCoords = fullCoords.concat(coords);
            setCompBoxList(
                compBoxList.map((box, index) => {
                    if (fullCoords.includes(index)) {
                        return {
                            status: "located",
                            bgColor: "#D1D1D1",
                            compShip: ship.name,
                        };
                    }
                    return {
                        ...box,
                    };
                })
            );
        });
        console.log(fullCoords);
    };

    const handleMouseOverUser = (id) => {
        setBoxList(
            userBoxList.map((box, index) => {
                if (box.status === "empty" && userShip) {
                    if (rotation) {
                        if (
                            [id, id + 10, id + 20, id + 30, id + 40]
                                .slice(0, userShip.length)
                                .includes(index)
                        ) {
                            if (
                                id > 110 - userShip.length * 10 - 1 ||
                                [id, id + 10, id + 20, id + 30, id + 40]
                                    .slice(0, userShip.length)
                                    .some(
                                        (item) =>
                                            userBoxList[item].status !== "empty"
                                    )
                            ) {
                                return {
                                    ...box,
                                    bgColor: "red",
                                };
                            }
                            return {
                                ...box,
                                bgColor: "#D1D1D1",
                            };
                        }
                        return {
                            ...box,
                            bgColor: "#051367",
                        };
                    } else {
                        if (
                            [id, id + 1, id + 2, id + 3, id + 4]
                                .slice(0, userShip.length)
                                .slice(0, 10 - (id % 10))
                                .includes(index)
                        ) {
                            if (
                                id % 10 > 10 - userShip.length ||
                                [id, id + 1, id + 2, id + 3, id + 4]
                                    .slice(0, userShip.length)
                                    .slice(0, 10 - (id % 10))
                                    .some(
                                        (item) =>
                                            userBoxList[item].status !== "empty"
                                    )
                            ) {
                                return {
                                    ...box,
                                    bgColor: "red",
                                };
                            }
                            return {
                                ...box,
                                bgColor: "#D1D1D1",
                            };
                        }
                        return {
                            ...box,
                            bgColor: "#051367",
                        };
                    }
                }
                return box;
            })
        );
    };

    const handleMouseClickUser = (id) => {
        setBoxList(
            userBoxList.map((box, index) => {
                if (rotation) {
                    if (
                        box.bgColor !== "red" &&
                        userShip &&
                        [id, id + 10, id + 20, id + 30, id + 40]
                            .slice(0, userShip.length)
                            .includes(index) &&
                        box.status === "empty"
                    ) {
                        setUserShip(shipList[shipList.indexOf(userShip) + 1]);
                        return {
                            ...box,
                            status: "located",
                            bgColor: "#D1D1D1",
                            userShip: userShip.name,
                        };
                    }
                    return box;
                } else {
                    if (
                        box.bgColor !== "red" &&
                        userShip &&
                        [id, id + 1, id + 2, id + 3, id + 4]
                            .slice(0, userShip.length)
                            .slice(0, 10 - (id % 10))
                            .includes(index) &&
                        box.status === "empty"
                    ) {
                        setUserShip(shipList[shipList.indexOf(userShip) + 1]);
                        return {
                            ...box,
                            status: "located",
                            bgColor: "#D1D1D1",
                            userShip: userShip.name,
                        };
                    }
                    return box;
                }
            })
        );
        if (userShip === "undefined") {
            setUserShip({
                name: "deploy completed",
                length: 0,
            });
        }
    };

    // const handleMouseOverComp = (id) => {
    //     setCompBoxList(
    //         compBoxList.map((box, index) => {
    //             if (id === index) {
    //                 return {
    //                     ...box,
    //                     bgColor: "#D1D1D1",
    //                 };
    //             }
    //             return {
    //                 ...box,
    //                 bgColor: "#051367",
    //             };
    //         })
    //     );
    // };

    const handleRotation = () => {
        setRotation(!rotation);
    };

    return (
        <GameContext.Provider
            value={{
                userBoxList,
                rotation,
                gameStatus,
                compBoxList,
                handleRotation,
                handleMouseOverUser,
                handleMouseClickUser,
                // handleMouseOverComp,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
