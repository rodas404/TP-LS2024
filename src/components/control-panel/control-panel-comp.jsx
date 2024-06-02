import React from "react";
import "./control-panel.css"; 


function ControlPanel(props) {
  const { gameStarted, selectedLevel, onGameStart, onLevelChange, timer, minesLeft} = props;
  const gameStartedClass = gameStarted ? " gameStarted" : "";
  return (
    <section id="panel-control">
      <form className="form">
        <fieldset className="form-group">
          <label htmlFor="btLevel">Nível:</label>
          <select
            id="btLevel"
            defaultValue="0"
            onChange={onLevelChange}
            disabled={gameStarted}
          >
            <option value="0">Selecione...</option>
            <option value="1">Básico (9x9 - 10 minas)</option>
            <option value="2">Intermédio (16x16 - 40 minas)</option>
            <option value="3">Avançado (30x16 - 99 minas)</option>
          </select>
        </fieldset>
        <button
          type="button"
          id="btPlay"
          disabled={selectedLevel === "0"}
          onClick={onGameStart}
        >
          {gameStarted ? "Parar jogo" : "Iniciar Jogo"}
        </button>
      </form>
      <div className="form-metadata">
        <dl className={`list-item left${gameStartedClass}`}>
          <dt>Tempo de Jogo:</dt>
          <dd id="gameTime">{timer}</dd>
        </dl>
        <dl className={`list-item left${gameStartedClass}`}>
          <dt>Minas:</dt>
          <dd id="mines">{minesLeft}</dd>
        </dl> 
      </div>
      
    </section>   
  );
}

export default ControlPanel;
