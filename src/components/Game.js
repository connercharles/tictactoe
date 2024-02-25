import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import Board from './Board';
import Modal from './Modal';
import './Game.css';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('');
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const handleClick = (index) => {
    if (calculateWinner(squares) || squares[index]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';

    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  React.useEffect(() => {
    if (!squares.includes(null)) {
      setStatus('Draw!');
    }
  }, [squares]);

  React.useEffect(() => {
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else if (!squares.includes(null)) {
      setStatus('Draw!');
    } else {
      setStatus(`Next player: ${xIsNext ? 'X' : 'O'}`);
    }
  }, [squares, winner, xIsNext]);

  React.useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setWinner(winner);
      setShowModal(true);
    }
  }, [squares]);

  return (
    <div className="game">
      <h2>{status}</h2>
      {showModal && 
        <Modal 
          onClose={() => {
            resetGame();
            setShowModal(false);
          }}
          winner={winner} />}
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div>
        <button 
          className="new-game-button"
          onClick={resetGame}>
            <FontAwesomeIcon icon={faRedo} /> New Game
          </button>
      </div>
    </div>
  );
};

export default Game;
