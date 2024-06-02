function revealZeros(grid, rowIndex, cellIndex, nonMineFound) {
    if (grid[rowIndex][cellIndex].flag === 0) {
        grid[rowIndex][cellIndex].revealed = true;
        nonMineFound++;
    }

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const dx = rowIndex + i;
            const dy = cellIndex + j;

            if (dx >= 0 && dx < grid.length && dy >= 0 && dy < grid[0].length) {
                const cell = grid[dx][dy];

                if (cell.value === 0 && !cell.revealed && cell.flag === 0) {
                    nonMineFound= revealZeros(grid, dx, dy, nonMineFound);
                }
                else if(!cell.revealed && cell.flag === 0){
                    cell.revealed = true;
                    nonMineFound++;
                }
            }
        }
    }

    return nonMineFound;
}

export default revealZeros;