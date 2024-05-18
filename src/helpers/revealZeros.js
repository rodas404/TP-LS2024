function revealZeros(grid, rowIndex, cellIndex, nonMineCount) {
    // diferentes direções
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    // marcar a celula atual como revelada se nao tiver flag
    if (grid[rowIndex][cellIndex].flag === 0) {
        grid[rowIndex][cellIndex].revealed = true;
        nonMineCount--;
    }
    
    for (let i = 0; i < directions.length; i++) { //ciclo para percorrer todas as direções marcadas acima (8)
        const [dx, dy] = directions[i]; //deconstroi os arrays marcados acima, podendo ser [-1,-1], [-1,0] etc
        const newRow = rowIndex + dx; //para desta forma passar a verificar a celula adjacente
        const newCell = cellIndex + dy;

        // verifica primeiro se esta dentro dos limites do tabuleiro
        if (newRow >= 0 && newRow < grid.length && newCell >= 0 && newCell < grid[0].length) {
            const cell = grid[newRow][newCell];

            // se a celula adjacente for 0 e nao estiver revelada, nem com flag, volta ao inicio atualiza numero
            if (cell.value === 0 && !cell.revealed && cell.flag === 0) {
                nonMineCount = revealZeros(grid, newRow, newCell, nonMineCount);
            } 
            else if(!cell.revealed && cell.flag === 0){
                cell.revealed = true;
                nonMineCount--;
            }
        }
    }
    return nonMineCount;
}

export default revealZeros;