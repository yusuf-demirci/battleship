
const Box = ({ num, bgColor, funcOver, funcClick }) => {
    return (
        <div
            id={num}
            className="box"
            onMouseEnter={() => funcOver(num)}
            onClick={() => funcClick(num)}
            style={{
                backgroundColor: `${bgColor}`,
            }}
        ></div>
    );
};

export default Box;
