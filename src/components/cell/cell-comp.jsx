import React from 'react';


function Cell({ cellDetails, updateRightClick, updateReveal }) {
    const { cell, rowIndex, cellIndex } = cellDetails;
    const {value, flag} = cell;
    

    const handleClick = () => {
        console.log(`Celula ((${rowIndex}, ${cellIndex}): value: ${value}, flag: ${flag})`);
    };

    const handleRightClick = (event) => {
        event.preventDefault();
        updateRightClick(rowIndex, cellIndex);
        handleClick();
    };

    const revealCell = (event) =>{
        event.preventDefault();
        updateReveal(rowIndex, cellIndex);
        handleClick();
    };

    return (
    <div className="cell board-cell" onClick={revealCell} onContextMenu={handleRightClick}>
        {cell.revealed ? (cell.value === 'M' ? '💣' : cell.value) : 
        (flag === 1 ? '🚩' : (flag === 2 ? '❓' : ""))}
    </div>
);
}

export default Cell;