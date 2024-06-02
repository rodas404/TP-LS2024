// game-over.jsx
import React from 'react';
import './game-over.css';

function GameOver({ result, timer, level, onGameStart, nonMineFound }) {
  const score = (result === 1 ? 1000 : 0) + (500 - timer) + (level * 100) + (nonMineFound  * 10);
  return (
    <div className="game-over">
      <div className="game-over-content">
        {result === 1 ? <h1>VITORIA</h1> : <h1>DERROTA</h1>}
        <h2>Pontuação: {score}</h2>
        <h2>Minas: {nonMineFound}</h2>
        <button onClick={onGameStart}>Iniciar Novamente</button>
      </div>
    </div>
  );
}

export default GameOver;
