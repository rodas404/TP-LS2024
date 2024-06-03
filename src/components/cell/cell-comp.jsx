import React from 'react';
import './cell.css';
import mineImage from '../../assets/mine.png';
import questionImage from '../../assets/question.png';
import flagImage from '../../assets/flag.png';

function Cell({ cellDetails, updateRightClick, updateReveal }) {
  const { cell, x, y } = cellDetails;
  const { value, flag, revealed } = cell;

  const handleClick = () => {
    console.log(`Célula (${x}, ${y}): value: ${value}, flag: ${flag}`);
  };

  const handleRightClick = (event) => {
    event.preventDefault(); //previne comportamento padrao do js
    updateRightClick(x, y);
    handleClick();
  };

  const revealCell = (event) => {
    event.preventDefault();
    updateReveal(x, y);
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
      {revealed ? (value === 'M' ? <img src={mineImage} alt="💣"/> : value) : 
      (flag === 1 ? <img src={flagImage} alt="🚩"/> : (flag === 2 ? <img src={questionImage} alt="❓"/> : ""))}
    
      {/* {value === 'M' ? <img src={mineImage} alt="💣"/> : (revealed ? value : "")} */}
    </div>
  );
}

export default Cell;
