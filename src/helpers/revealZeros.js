function revealZeros(board, x, y, nonMineFound) {
    if (board[x][y].flag === 0) {
        board[x][y].revealed = true; //se nao tiver flag, revela e soma contador
        nonMineFound--;
    }

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const dx = x + i; //celulas adjacentes
            const dy = y + j;

            if (dx >= 0 && dx < board.length && dy >= 0 && dy < board[0].length) { //ve se esta dentro dos limites
                const cell = board[dx][dy];

                if (cell.value === 0 && !cell.revealed && cell.flag === 0) {
                    nonMineFound= revealZeros(board, dx, dy, nonMineFound); //reseta ao encontrar outra celula com 0
                }
                else if(!cell.revealed && cell.flag === 0){
                    cell.revealed = true; //se nao estiver revelado e nao tiver flag, revela e soma contador
                    nonMineFound--;
                }
            }
        }
    }

    return nonMineFound;
}

export default revealZeros;