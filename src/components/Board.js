import './Board.css';

const Board = ({ squares, onClick }) => {
  const handleClick = (index) => {
    onClick(index);
  }
  
  return (
    <div className="board">
      {squares.map((square, index) => (
        <button key={index} onClick={() => handleClick(index)}>
          {square}
        </button>
      ))}
    </div>
  );
};

export default Board;