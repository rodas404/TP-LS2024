import React, {useEffect, useState} from 'react';
import createBoard from "../../helpers/createBoard";
import Cell from '../cell/cell-comp';
import './board.css';
import revealZeros from '../../helpers/revealZeros';

function Board(){
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const newBoard = createBoard(10, 10, 20);
    setGrid(newBoard);
  }, []);


  const updateRightClick = (rowIndex, cellIndex) => {
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