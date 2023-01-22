import Square from './Square';
import CalculateWinner from './CalculateWinner';

const Board = ({ xIsNext, squares, onPlay }) => {

    let status;
    const isWinner = CalculateWinner(squares);

    const locations = [
        [1, 1],
        [2, 1],
        [3, 1],
        [1, 2],
        [2, 2],
        [3, 2],
        [1, 3],
        [2, 3],
        [3, 3],
    ];

    if (isWinner) {
        status = "Winner: " + isWinner.winner;
      } else if (!squares.includes(null) && !isWinner) {
        status = "Game ended in Draw.";
      } else {
        status = "Next Player: " + (xIsNext ? "x" : "O");
      }

    const handleClick = (i) => {
        const nextSquares = squares.concat({ location: locations[i] });

        if (squares[i] || CalculateWinner(squares)) {
          return;
        }
        if (xIsNext) {
          nextSquares[i] = "X";
        } else {
          nextSquares[i] = "O";
        }
        
        onPlay(nextSquares);
    }

    let SquaresTag = []
    for (let i = 0 ; i < 3 ; i++) {
    let rows = [];
    for (let j=0 ; j < 3 ; j++ ) {
        let c = i * 3 + j;
        rows.push(
            <Square 
                key={c}
                value={squares[c]}
                onSquareClick={() => handleClick(c)}
                isWinner={isWinner && isWinner.line.includes(c)}
                />
        )
    }
    SquaresTag.push(
        <div key={i} className="board-row">
            {rows}
        </div>
    )
    }

    return(
        <>
            <div className="board-status">{status}</div>
            {SquaresTag}
        </>
    );
}


export default Board;