function helpFirstClick(board, x, y) {
  let flag = 0;
  let randomX, randomY;
  do {
    randomX = Math.floor(Math.random() * board.length);
    randomY = Math.floor(Math.random() * board[0].length);

    //verifica se a nova localizacao nao e a mesma ou se tem mina la
    if ((randomX !== x || randomY !== y) && board[randomX][randomY].value !== "M") {
      flag = 1;
      board[x][y].value = 0;
      board[randomX][randomY].value = "M";
    }
  } while (!flag);

  // atualiza o numero de minas adjacentes da localizacao antiga da mina
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let ni = x + i;
      let nj = y + j;
      if (ni >= 0 && ni < board.length && nj >= 0 && nj < board[0].length && board[ni][nj].value !== "M") {
        let mines = 0;
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            let xi = ni + di;
            let xj = nj + dj;
            if (xi >= 0 && xi < board.length && xj >= 0 && xj < board[0].length && board[xi][xj].value === "M") {
              mines++;
            }
          }
        }
        board[ni][nj].value = mines;
      }
    }
  }

  // atualiza o numero de minas adjacentes da nova localizacao da mina
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let ni = randomX + i;
      let nj = randomY + j;
      if (ni >= 0 && ni < board.length && nj >= 0 && nj < board[0].length && board[ni][nj].value !== "M") {
        let mines = 0;
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            let xi = ni + di;
            let xj = nj + dj;
            if (xi >= 0 && xi < board.length && xj >= 0 && xj < board[0].length && board[xi][xj].value === "M") {
              mines++;
            }
          }
        }
        board[ni][nj].value = mines;
      }
    }
  }

  
  return board;
}

export default helpFirstClick;
