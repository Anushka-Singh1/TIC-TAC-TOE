import React, { useState } from 'react';
import Game from './Game';
import './App.css';

function App() {
  const [gridSize, setGridSize] = useState(3);
  const [winStreak, setWinStreak] = useState(3);
  const [startGame, setStartGame] = useState(false);

  const handleStartGame = () => {
    if (gridSize >= 3 && gridSize <= 10 && winStreak >= 3 && winStreak <= gridSize) {
      setStartGame(true);
    } else {
      alert('Invalid input! Grid size should be 3-10 and win streak should be 3-gridSize.');
    }
  };

  return (
    <>
     {!startGame ? (
        <div>
          <h1>Customizable Tic-Tac-Toe</h1>
          <div>
            <label>
              Grid Size (n):
              <input type="number" value={gridSize} onChange={(e) => setGridSize(parseInt(e.target.value))} />
            </label>
          </div>
          <div>
            <label>
              Win Streak (m):
              <input type="number" value={winStreak} onChange={(e) => setWinStreak(parseInt(e.target.value))} />
            </label>
          </div>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <Game gridSize={gridSize} winStreak={winStreak} />
      )} 
    </>
  );
}

export default App;
