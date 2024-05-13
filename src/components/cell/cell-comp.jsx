import React, { useState } from 'react';


function Cell({ cellDetails, updateRightClick, updateReveal }) {
    const { cell, rowIndex, cellIndex } = cellDetails;
    const {value, revealed, flag} = cell;
    

    const handleClick = () => {
        console.log(`Celula clicada: ((${rowIndex}, ${cellIndex}), flag: ${flag})`);
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
            {cell.revealed ? cell.value : ""}
        </div>
    );
}

export default Cell;