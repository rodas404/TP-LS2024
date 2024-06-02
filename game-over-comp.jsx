// game-over.jsx
import React, { useState } from 'react';
import './game-over.css';



function GameOver({ result, timer, level, onGameStart, unrevealedCells }) {
  const [isVisible, setIsVisible] = useState(true);

  const calculateScore = (level) => {
    let score = 0;
    switch (level) {
      case '1':
        score = (((((9 * 9 - unrevealedCells - 10)) / (9 * 9 - 10)) * 100)) * ((1 + timer) / timer); //jogadas certas percentualmente (tempo medio 30s)
        break;
      case '2':
        score = (((((16 * 16 - unrevealedCells - 40)) / (16 * 16 - 40)) * 100)) * ((2 + timer) / timer); //tempo medio 60s
        break;
      case '3':
        score = (((((30 * 16 - unrevealedCells - 99)) / (30 * 16 - 99)) * 100)) * ((4 + timer) / timer); //tempo medio 2min
        break;
      default:
        score = 0;
    }
    if (timer === 0) {
      score = 0;
    }
    return score;
  }
  const getGrade = (points) => {
    if (points > 102) {
      return { grade: 'A+', color: 'blue' };
    } else if (points > 70) {
      return { grade: 'A', color: 'green' };
    } else if (points > 35) {
      return { grade: 'B', color: 'orange' };
    } else {
      return { grade: 'C', color: 'red' };
    }
  }

  const points = Math.round(calculateScore(level, unrevealedCells, timer));
  const { grade, color } = getGrade(points);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // Não renderiza nada se isVisible for false
  }


  return (
    <div className="overlay">
      <div className="game-over">
        {result === 1 ? <h1 id = "maquina">VITÓRIA</h1> : <h1>DERROTA</h1>}
        <h2>Tempo usado: {timer}s</h2>
        <h2>Pontuação: {points}</h2>
        <h2 style={{ color: color }}>Classificação: {grade}</h2>
        <button id = "iniciar" onClick={onGameStart}>Iniciar Novamente</button>
        <button onClick={handleClose} className="close-button">Fechar</button> {/* Botão para fechar */}
      </div>
    </div>
  );
}

export default GameOver;