import React from 'react';
import './cell.css';

function Cell({ cellDetails, updateRightClick, updateReveal }) {
  const { cell, rowIndex, cellIndex } = cellDetails;
  const { value, flag, revealed } = cell;

  const handleClick = () => {
    console.log(`Célula (${rowIndex}, ${cellIndex}): value: ${value}, flag: ${flag}`);
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    updateRightClick(rowIndex, cellIndex);
    handleClick();
  };

  const revealCell = (event) => {
    event.preventDefault();
    updateReveal(rowIndex, cellIndex);
    handleClick();
  };

  const getClassNames = () => {
    let classNames = "cell";
    if (revealed) {
      classNames += " revealed";
      if (value === 'M') {
        classNames += " mine";
      } else if (value > 0) {
        classNames += ` number-${value}`;
      }
    } else if (flag === 1) {
      classNames += " flagged";
    }
    return classNames;
  };

  return (
    <div className={getClassNames()} onClick={revealCell} onContextMenu={handleRightClick}>
      {revealed ? (value === 'M' ? '💣' : value) : 
      (flag === 1 ? '🚩' : (flag === 2 ? '❓' : ""))}
    </div>
  );
}

export default Cell;
