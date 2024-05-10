import React from 'react';

function Cell({ cellDetails }) {
    const { cell, rowIndex, cellIndex } = cellDetails;

    const handleClick = () => {
        console.log(`Celula clicada: (${rowIndex}, ${cellIndex})`);
    };

    return (
        <div className="cell board-cell" onClick={handleClick}>
            {cell}
        </div>
    );
}

export default Cell;