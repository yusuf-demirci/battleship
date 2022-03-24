const Button = ({ className, name, func }) => {
    return (
        <button className={className} onClick={func}>
            {name}
        </button>
    );
};

export default Button;
