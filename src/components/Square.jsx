const Square = ({ value, onSquareClick, isWinner }) => {

    return(
        <button
            className={`square ${isWinner && " square-won"}`}
            onClick={onSquareClick}>
                {value}
        </button>
    );
}

export default Square;