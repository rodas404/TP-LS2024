import React, {useEffect, useState} from 'react';
import createBoard from "../../helpers/createBoard";
import Cell from '../cell/cell-comp';
import './board.css';
import revealZeros from '../../helpers/revealZeros';

function Board({levelDetails, gameStarted}){
  const {numRows, numCols, numMines} = levelDetails;
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if(gameStarted){ //cria tabuleiro ao clicar no iniciar jogo, nao fica fluido ao mudar de nivel tho
      const newBoard = createBoard(numRows, numCols, numMines);
      setGrid(newBoard);
    }
  }, [levelDetails, numRows, numCols, numMines, gameStarted]); 


  const updateRightClick = (rowIndex, cellIndex) => {
    if(!gameStarted){
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid));
    if(newGrid[rowIndex][cellIndex].flag === 0){ //flag
      newGrid[rowIndex][cellIndex].flag = 1;
      newGrid[rowIndex][cellIndex].revealed = true;
    }
    else if(newGrid[rowIndex][cellIndex].flag === 1){ //question mark
      newGrid[rowIndex][cellIndex].flag = 2;
    }
    else {
      newGrid[rowIndex][cellIndex].flag = 0; //reset
      newGrid[rowIndex][cellIndex].revealed = false; 
    }
    setGrid(newGrid);
  };

  const updateReveal = (rowIndex, cellIndex) => {
    if(!gameStarted){
      return;
    }
    if(grid[rowIndex][cellIndex].value === 'M'){
      alert('perdeste cabrao');
    }
    else if(grid[rowIndex][cellIndex].value === 0){
      revealZeros(grid, rowIndex, cellIndex);
    }
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[rowIndex][cellIndex].revealed = true;
      return newGrid;
    });
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