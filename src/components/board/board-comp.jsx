import React, {useEffect, useState} from 'react';
import createBoard from "../../helpers/createBoard";
import Cell from '../cell/cell-comp';
import './board.css';
import revealZeros from '../../helpers/revealZeros';

const GAME_STATES = {
  loss: 0,
  win: 1,
  ongoing: null
};

function Board({levelDetails, gameStarted, gameInfo}){
  const {numRows, numCols, numMines} = levelDetails;
  const [nonMineCount, setNonMineCount ] = useState(0);
  const [numFlag, setNumFlags] = useState(0);
  const [grid, setGrid] = useState([]);
  const [result, setResult] = useState(GAME_STATES.ongoing);

  useEffect(() => {
    if(gameStarted){ //cria tabuleiro ao clicar no iniciar jogo, nao fica fluido ao mudar de nivel tho
      const newBoard = createBoard(numRows, numCols, numMines);
      setNonMineCount(numRows * numCols - numMines);
      setResult(GAME_STATES.ongoing);
      setGrid(newBoard);
      setNumFlags(0);
    }
  }, [levelDetails, numRows, numCols, numMines, gameStarted]); 


  useEffect(() => { //segundo useEffect para chamar a função gameInfo que fornece o numero de minas a explodir, fica tudo bugado ao chamar essa funcao no useEffect acima
    if (gameStarted) {
      gameInfo(null, numFlag, numMines);
    }
  }, [grid, gameStarted, numFlag, numMines, gameInfo]);

  const updateRightClick = (rowIndex, cellIndex) => {
    let nFlags = numFlag;
    if(!gameStarted){
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid));
    if(newGrid[rowIndex][cellIndex].flag === 0){ //flag
      newGrid[rowIndex][cellIndex].flag = 1;
      nFlags++;
    }
    else if(newGrid[rowIndex][cellIndex].flag === 1){ //question mark
      newGrid[rowIndex][cellIndex].flag = 2;
      nFlags--;
    }
    else {
      newGrid[rowIndex][cellIndex].flag = 0; //reset 
    }
    setGrid(newGrid);
    setNumFlags(nFlags);
    gameInfo(result, nFlags, numMines);
  };

  const updateReveal = (rowIndex, cellIndex) => {
    let newResult = result;
    let newNonMineCount = nonMineCount;
    if(!gameStarted || grid[rowIndex][cellIndex].flag !== 0){
      return;
    }
    if(grid[rowIndex][cellIndex].value === 'M'){
      newResult = GAME_STATES.loss;
      setResult(newResult);
      revealMines();
    }
    if(grid[rowIndex][cellIndex].value === 0){
     newNonMineCount = revealZeros(grid, rowIndex, cellIndex, nonMineCount);
    }
    else{
      newNonMineCount--;
    }
    setNonMineCount(newNonMineCount);
    if(newNonMineCount === 0){
      newResult = GAME_STATES.win;
      setResult(newResult);
      revealMines();
    }
    gameInfo(newResult, numFlag, numMines);
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[rowIndex][cellIndex].revealed = true;
      return newGrid;
    });
  };



  const revealMines = () => { //melhorar esta funcao de forma a ter delay enquanto revela as minas
    let newGrid = JSON.parse(JSON.stringify(grid));
    for(let i = 0; i < newGrid.length; i++){
      for(let j = 0; j < newGrid[i].length; j++){
        if(newGrid[i][j].value === 'M'){
          newGrid[i][j].revealed = true;
        }
      }
    }
    setGrid(newGrid);
  };
  

  return (
    <div className="board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, cellIndex) => {
            const key = `${rowIndex}-${cellIndex}`;
            const cellDetails = {
              cell: cell,
              rowIndex: rowIndex,
              cellIndex: cellIndex,
            };
            return <Cell key={key} cellDetails={cellDetails} updateRightClick={updateRightClick} updateReveal={updateReveal}  />;
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;