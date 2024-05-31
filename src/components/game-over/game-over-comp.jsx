// game-over.jsx
import React from 'react';
import './game-over.css';

function GameOver({ result, timer, level, onGameStart }) {
  return (
    <div className="game-over">
      {result === 1 ? <h1>MAQUINA</h1> : <h1>PERDEU</h1>}
      <h2>Tempo usado: {timer}</h2>
      <h2>Nivel: {level}</h2>
      <button onClick={onGameStart}>Iniciar Novamente</button>
    </div>
  );
}

export default GameOver;
