import React, {useEffect, useState} from 'react';
import createBoard from "../../helpers/createBoard";
import Cell from '../cell/cell-comp';
import './board.css';

function Board(){
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const newBoard = createBoard(10, 10, 20);
    setGrid(newBoard);
  }, []);

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
            return <Cell key={key} cellDetails={cellDetails} />;
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;