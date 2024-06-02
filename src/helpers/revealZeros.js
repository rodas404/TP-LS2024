function revealZeros(grid, x, y, nonMineFound) {
    if (grid[x][y].flag === 0) {
        grid[x][y].revealed = true; //se nao tiver flag, revela e soma contador
        nonMineFound++;
    }

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const dx = x + i; //celulas adjacentes
            const dy = y + j;

            if (dx >= 0 && dx < grid.length && dy >= 0 && dy < grid[0].length) { //ve se esta dentro dos limites
                const cell = grid[dx][dy];

                if (cell.value === 0 && !cell.revealed && cell.flag === 0) {
                    nonMineFound= revealZeros(grid, dx, dy, nonMineFound); //reseta ao encontrar outra celula com 0
                }
                else if(!cell.revealed && cell.flag === 0){
                    cell.revealed = true; //se nao estiver revelado e nao tiver flag, revela e soma contador
                    nonMineFound++;
                }
            }
        }
    }

    return nonMineFound;
}

export default revealZeros;