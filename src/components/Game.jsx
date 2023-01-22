import { useState } from 'react';
import Board from './Board';

const Game = () => {

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isSorted, setIsSorted] = useState(false);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    const handlePlay = (nextSquares) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    const jumpTo = (nextMove) => {
        setCurrentMove(nextMove);
    }   

    const moves = history.map((squares, move) => {
        let description;
        let locationMove;

        if ( move > 0 ) {
            let indexLocation = move + 8;
            locationMove = ` => C${squares[indexLocation].location[0]}  R${squares[indexLocation].location[1]}`;
            description = `Go to Step #${move}`
        } else {
            description = "Go to Start game.";
        }

        return (
            <li key ={move}>
                {currentMove === move ? (
                        `You Are At Move #${move + 1} ${locationMove ? locationMove : ''}`
                    ) : (
                        <button onClick={() => jumpTo(move)}>{description}</button>
                    )
                }
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <button 
                    className="sort" 
                    onClick={() => setIsSorted(isSorted => !isSorted)} >
                {isSorted ? "Sort Ascending" : "Sort Descending"}
                </button>
                <ol>{isSorted ? moves.reverse() : moves}</ol>
            </div>
        </div>
    )
}

export default Game;