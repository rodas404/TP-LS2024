import React, { useEffect, useState } from 'react';
import createBoard from "../../helpers/createBoard";
import Cell from '../cell/cell-comp';
import './board.css';
import revealZeros from '../../helpers/revealZeros';
import helpFirstClick from '../../helpers/helpFirstClick';

const GAME_STATES = {
  loss: 0,
  win: 1,
  ongoing: null
};

function Board({ levelDetails, gameStarted, gameInfo}) {
  const { numRows, numCols, numMines } = levelDetails;
  const [nonMineFound, setNonMineFound] = useState(0);
  const [numFlag, setNumFlags] = useState(0);
  const [board, setBoard] = useState([]);
  const [result, setResult] = useState(GAME_STATES.ongoing);
  const [firstClick, setFirstClick] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      const boardCopy = createBoard(numRows, numCols, numMines);
      setFirstClick(false);
      setNonMineFound(numRows * numCols - numMines);
      setResult(GAME_STATES.ongoing);
      setBoard(boardCopy);
      setNumFlags(0);
    }
  }, [levelDetails,numRows, numCols, numMines, gameStarted]);


  useEffect(() => { //segundo useEffect para chamar a funcao gameInfo, por alguma razao nao funciona dentro do primeiro useEffect
    if (gameStarted) {
      gameInfo(GAME_STATES.ongoing, numFlag, numMines, nonMineFound);
    }
  }, [board, gameStarted, numFlag, numMines, gameInfo, nonMineFound]);

  const updateRightClick = (x, y) => {
    let nFlags = numFlag;
    if (!gameStarted || board[x][y].revealed === true) {
      return;
    }
    const boardCopy = [...board]; //cria copia do board
    if (boardCopy[x][y].flag === 0) {
      boardCopy[x][y].flag = 1;
      nFlags++;
    } else if (boardCopy[x][y].flag === 1) {
      boardCopy[x][y].flag = 2;
      nFlags--;
    } else {
      boardCopy[x][y].flag = 0;
    }
    setBoard(boardCopy);
    setNumFlags(nFlags);
    gameInfo(result, nFlags, numMines, nonMineFound);
  };

  const updateReveal = (x, y) => {
    let newResult = result;
    let newNonMineFound = nonMineFound;
    if (!gameStarted || board[x][y].flag !== 0 || board[x][y].revealed === true) {
      return;
    }
    if (!firstClick) { //caso o primeiro click seja numa mina, altera a board
      setFirstClick(true);
      if (board[x][y].value === 'M') {
        let boardCopy = [...board];
        let updatedBoard = helpFirstClick(boardCopy, x, y);
        if (updatedBoard[x][y].value === 0) {
          newNonMineFound = revealZeros(updatedBoard, x, y, nonMineFound);
        } else {
          updatedBoard[x][y].revealed = true;
          newNonMineFound--;
        }
        setBoard(updatedBoard);
        setNonMineFound(newNonMineFound);
        return;
      }
    }

    //processo normal
    if (board[x][y].value === 'M') {
      newResult = GAME_STATES.loss;
      newNonMineFound++;
      setResult(newResult);
      revealMines();
    }
    if (board[x][y].value === 0) {
      newNonMineFound = revealZeros(board, x, y, nonMineFound);
    } else {
      newNonMineFound--;
    }
    setNonMineFound(newNonMineFound);
    if (newNonMineFound === 0) {
      newResult = GAME_STATES.win;
      setResult(newResult);
      revealMines();
    }
    gameInfo(newResult, numFlag, numMines, newNonMineFound);
    setBoard(prevBoard => {
      const boardCopy = [...prevBoard];
      boardCopy[x][y].revealed = true;
      return boardCopy;
    });
  };

  const revealMines = () => {
    let boardCopy = [...board];
    for (let i = 0; i < boardCopy.length; i++) {
      for (let j = 0; j < boardCopy[i].length; j++) {
        if (boardCopy[i][j].value === 'M') {
          boardCopy[i][j].revealed = true;
        }
      }
    }
    setBoard(boardCopy);
  };

  return (
    <div className="board">
      {board.map((row, x) => ( //cria linhas para o array
        <div key={x} className="board-row">
          {row.map((cell, y) => { //cria colunas para o array
            const key = `${x}-${y}`;
            const cellDetails = {
              cell: cell,
              x: x,
              y: y,
            };
            return (
              <Cell
                key={key}
                cellDetails={cellDetails}
                updateRightClick={updateRightClick}
                updateReveal={updateReveal}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;