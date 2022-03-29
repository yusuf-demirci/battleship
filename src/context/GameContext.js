import {
    createContext,
    useEffect,
    useState,
    useRef,
    useLayoutEffect,
} from "react";
import { shipList } from "../helper/ships";

const GameContext = createContext();
let fullAdjacentCoords = [];

export const GameProvider = ({ children }) => {
    const [userBoxList, setUserBoxList] = useState(
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
    const [compShip, setCompShip] = useState(shipList[0]);
    const [rotation, setRotation] = useState(true);
    const [gameStatus, setGameStatus] = useState("deploy");

    useEffect(() => {
        if (userShip === undefined) {
            setGameStatus("play");
        }
    }, [userShip]);

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        deployCompShip();
        setCompShip(shipList[shipList.indexOf(compShip) + 1]);
    }, [userShip]);

    const deployCompShip = () => {
        if (!compShip) return;
        let coords = [];
        let adjacentCoords = [];

        while (true) {
            coords = [];
            let coord = Math.floor(Math.random() * 100);
            let rotation = Math.floor(Math.random() * 2);

            if (rotation === 1) {
                if (
                    (coord % 10) + compShip.length <= 10 &&
                    fullAdjacentCoords.every(
                        (num) =>
                            ![
                                coord,
                                coord + 1,
                                coord + 2,
                                coord + 3,
                                coord + 4,
                            ].includes(num)
                    )
                ) {
                    adjacentCoords = [
                        [coord, coord + 1, coord - 1, coord + 10, coord - 10],
                        [
                            coord + 1 + 1,
                            coord + 1 - 1,
                            coord + 1 + 10,
                            coord + 1 - 10,
                        ],
                        [
                            coord + 2 + 1,
                            coord + 2 - 1,
                            coord + 2 + 10,
                            coord + 2 - 10,
                        ],
                        [
                            coord + 3 + 1,
                            coord + 3 - 1,
                            coord + 3 + 10,
                            coord + 3 - 10,
                        ],
                        [
                            coord + 4 + 1,
                            coord + 4 - 1,
                            coord + 4 + 10,
                            coord + 4 - 10,
                        ],
                    ].slice(0, compShip.length + 1);
                    for (let i = 0; i < compShip.length; i++) {
                        coords.push(coord + i);
                    }
                    break;
                }
            } else {
                if (
                    coord + (compShip.length - 1) * 10 <= 99 &&
                    fullAdjacentCoords.every(
                        (num) =>
                            ![
                                coord,
                                coord + 10,
                                coord + 20,
                                coord + 30,
                                coord + 40,
                            ].includes(num)
                    )
                ) {
                    adjacentCoords = [
                        [coord, coord + 1, coord - 1, coord + 10, coord - 10],
                        [
                            coord + 10,
                            coord + 10 + 1,
                            coord + 10 - 1,
                            coord + 10 + 10,
                            coord + 10 - 10,
                        ],
                        [
                            coord + 20,
                            coord + 20 + 1,
                            coord + 20 - 1,
                            coord + 20 + 10,
                            coord + 20 - 10,
                        ],
                        [
                            coord + 30,
                            coord + 30 + 1,
                            coord + 30 - 1,
                            coord + 30 + 10,
                            coord + 30 - 10,
                        ],
                        [
                            coord + 40,
                            coord + 40 + 1,
                            coord + 40 - 1,
                            coord + 40 + 10,
                            coord + 40 - 10,
                        ],
                    ].slice(0, compShip.length + 1);
                    for (let i = 0; i < compShip.length; i++) {
                        coords.push(coord + i * 10);
                    }
                    break;
                }
            }
        }

        fullAdjacentCoords = fullAdjacentCoords.concat(...adjacentCoords);

        setCompBoxList(
            compBoxList.map((box, index) => {
                if (coords.includes(index)) {
                    return {
                        ...box,
                        status: "located",
                        compShip: compShip.name,
                    };
                }
                return {
                    ...box,
                };
            })
        );
    };

    const handleMouseOverUser = (id) => {
        setUserBoxList(
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
        setUserBoxList(
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

    const handleMouseOverComp = (id) => {
        setCompBoxList(
            compBoxList.map((box, index) => {
                if (id === index && box.status !== "miss" && box.status !== "hit") {
                    return {
                        ...box,
                        bgColor: "#D1D1D1",
                    };
                }
                else if (box.status === "hit") {
                    return box
                }
                return {
                    ...box,
                    bgColor: "#051367"
                };
            })
        );
    };

    const handleMouseClickComp = (id) => {
        setCompBoxList(compBoxList.map(((box, index) => {
            if (id === index) {
                if (box.status === "located") {
                    return {
                        ...box,
                        status: "hit",
                        bgColor: "red"
                    }
                } else if (box.status === "hit") {
                    return box
                }
                return {
                    ...box,
                    status: "miss",

                }
            }

            return box
        })))
    }

    const handleRotation = () => {
        setRotation(!rotation);
    };

    return (
        <GameContext.Provider
            value={{
                userBoxList,
                compBoxList,
                rotation,
                gameStatus,
                compBoxList,
                handleRotation,
                handleMouseOverUser,
                handleMouseClickUser,
                handleMouseOverComp,
                handleMouseClickComp,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
