import React, { useState } from 'react';

const Game = ({ gridSize, winStreak }) => {
  const [board, setBoard] = useState(Array(gridSize).fill(null).map(() => Array(gridSize).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleClick = (row, col) => {
    if (!board[row][col] && !winner) {
      const newBoard = board.map(row => row.slice());
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      if (checkWinner(newBoard, row, col, currentPlayer)) {
        setWinner(currentPlayer);
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };

  const checkWinner = (board, row, col, player) => {
    // Directions arrays for row, column, and two diagonals
    const directions = [
      { dr: 0, dc: 1 }, // Horizontal
      { dr: 1, dc: 0 }, // Vertical
      { dr: 1, dc: 1 }, // Diagonal down-right
      { dr: 1, dc: -1 } // Diagonal down-left
    ];

    // Check in all four directions
    for (const { dr, dc } of directions) {
      let count = 1;
      for (let i = 1; i < winStreak; i++) {
        const nr = row + dr * i;
        const nc = col + dc * i;
        if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize && board[nr][nc] === player) {
          count++;
        } else {
          break;
        }
      }
      for (let i = 1; i < winStreak; i++) {
        const nr = row - dr * i;
        const nc = col - dc * i;
        if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize && board[nr][nc] === player) {
          count++;
        } else {
          break;
        }
      }
      if (count >= winStreak) {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <h2>Player {currentPlayer}'s turn</h2>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="cell" onClick={() => handleClick(rowIndex, colIndex)}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      {winner && <h2>Player {winner} wins!</h2>}
    </div>
  );
};

export default Game;
