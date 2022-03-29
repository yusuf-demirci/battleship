
const Box = ({ num, bgColor, funcOver, funcClick, status }) => {
    return (
        <div
            id={num}
            className={`box ${status}`}
            onMouseEnter={() => funcOver(num)}
            onClick={() => funcClick(num)}
            style={{
                backgroundColor: `${bgColor}`,
            }}
        ></div>
    );
};

export default Box;
