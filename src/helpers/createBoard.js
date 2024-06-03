function createBoard(numRows, numCols, numMines) {
    //cria tabuleiro
    let board = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
        board[i] = new Array(numCols);
        for (let j = 0; j < numCols; j++) {
            board[i][j] = { //propriedades necessarios para o funcionamento correto do jogo
                value: 0, 
                revealed: false,
                flag: 0
            };
        }
    }

    //coloca as minas
    for (let i = 0; i < numMines; i++) {
        let row = Math.floor(Math.random() * numRows);
        let col = Math.floor(Math.random() * numCols);
        //verifica se a celula ja tem bomba
        if (board[row][col].value === 'M') {
            i--;
        } else {
            board[row][col].value = 'M';
        }
    }

    //coloca os numeros
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (board[i][j].value !== 'M') { //efetua a contagem quando encontra uma celula sem bomba
                let mines = 0;
                for (let di = -1; di <= 1; di++) {
                    for (let dj = -1; dj <= 1; dj++) {
                        let ni = i + di; //estes dois ciclos servem para percorrer as celulas adjacentes a atual
                        let nj = j + dj; //verifica celulas acima, abaixo, esquerda, direita e diagonais
                        if (ni >= 0 && ni < numRows && nj >= 0 && nj < numCols && board[ni][nj].value === 'M') {
                            mines++; //se nao passar dos limites do tabuleiro e encontrar uma bomba, incrementa o numero de bombas adjacentes 
                        }
                    }
                }
                board[i][j].value = mines; 
            }
        }
    }

    return board;
}

export default createBoard;
