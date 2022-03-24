import { createContext, useState } from "react";
import { shipList } from "../helper/ships";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [boxList, setBoxList] = useState(
        Array(100).fill({
            status: "empty",
            bgColor: "#051367",
            ship: "empty",
        })
    );

    const [ship, setShip] = useState(shipList[0]);
    const [rotation, setRotation] = useState(true);

    const handleMouseOver = (id) => {
        setBoxList(
            boxList.map((box, index) => {
                if (box.status === "empty" && ship) {
                    if (rotation) {
                        if (
                            [id, id + 10, id + 20, id + 30, id + 40]
                                .slice(0, ship.length)
                                .includes(index)
                        ) {
                            if (
                                id > 110 - ship.length * 10 - 1 ||
                                [id, id + 10, id + 20, id + 30, id + 40].slice(
                                    0,
                                    ship.length
                                ).some(item => boxList[item].status !== "empty")
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
                                .slice(0, ship.length)
                                .slice(0, (10 - (id % 10)))
                                .includes(index)
                        ) {
                            if (
                                id % 10 > 10 - ship.length ||
                                [id, id + 1, id + 2, id + 3, id + 4]
                                    .slice(0, ship.length)
                                    .slice(0, 10 - (id % 10))
                                    .some(
                                        (item) =>
                                            boxList[item].status !== "empty"
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

    const handleMouseClick = (id) => {
        setBoxList(
            boxList.map((box, index) => {
                if (rotation) {
                    if (
                        box.bgColor !== "red" &&
                        ship &&
                        [id, id + 10, id + 20, id + 30, id + 40]
                            .slice(0, ship.length)
                            .includes(index) &&
                        box.status === "empty"
                    ) {
                        setShip(shipList[shipList.indexOf(ship) + 1]);
                        return {
                            ...box,
                            status: "located",
                            bgColor: "#D1D1D1",
                            ship: ship.name,
                        };
                    }
                    return box;
                } else {
                    if (
                        box.bgColor !== "red" &&
                        ship &&
                        [id, id + 1, id + 2, id + 3, id + 4]
                            .slice(0, ship.length)
                            .slice(0, 10 - (id % 10))
                            .includes(index) &&
                        box.status === "empty"
                    ) {
                        setShip(shipList[shipList.indexOf(ship) + 1]);
                        return {
                            ...box,
                            status: "located",
                            bgColor: "#D1D1D1",
                            ship: ship.name,
                        };
                    }
                    return box;
                }
            })
        );
        if (ship === "undefined") {
            setShip({
                name: "deploy completed",
                length: 0,
            });
        }
    };

    const handleRotation = () => {
        setRotation(!rotation);
    };

    return (
        <GameContext.Provider
            value={{
                boxList,
                rotation,
                handleRotation,
                handleMouseOver,
                handleMouseClick,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
