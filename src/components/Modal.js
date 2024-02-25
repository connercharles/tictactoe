import React, { useContext, useState } from 'react';
import { WinnersContext } from '../App';
import './Modal.css';

const Modal = ({ onClose, winner }) => {
    const [playerName, setPlayerName] = useState('');
    const { history, setHistory } = useContext(WinnersContext);

    const handleModalClose = () => {
        onClose();
    };

    const handleModalSubmit = () => {
        if (playerName && winner) {
            const newHistory = [...history, { player: playerName, winner }];
            setHistory(newHistory);
        }
        onClose();
    };

  return (
    <div className='modal-container'>
      <div className="modal">
        <div className="modal-content">
          <h1>{winner} Won!</h1>
          <h3>Enter Player Name</h3>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={handleModalSubmit}>Submit</button>
          <button onClick={handleModalClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;