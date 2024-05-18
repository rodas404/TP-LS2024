import React from 'react';

function GameOver({ result, timer, level}){
    
    //criar uma formula muito fixe para determinar a pontuacao/nota de um jogo
      return(
        //deve ter um botao para iniciar novamente partida
        <div>
            {result === 1 ? <h1>MAQUINA</h1> : <h1>LOOOOOOOOOOOOOOL</h1>}
            <h2>Tempo usado: {timer}</h2>
            <h2>Nivel: {level}</h2>
        </div>
    );
}

export default GameOver;