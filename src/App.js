import React from "react";
import "./App.css"
import {useState, useEffect} from "react";

import Header from "./components/header/header-comp";
import Board from './components/board/board-comp';
import Footer from "./components/footer/footer-comp";
import ControlPanel from "./components/control-panel/control-panel-comp";
import GameOver from './components/game-over/game-over-comp';

function App(){

  const [gameStarted, setGameStarted] = useState(false);
  const [levelDetails, setLevelDetails] = useState({ numRows: 0, numCols: 0, numMines: 0 });
  const [timer, setTimer] = useState(0);
  const [minesLeft, setMinesLeft] = useState(0);
  const [result, setResult] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [nonMineFound, setNonMineFound] = useState(0);


  const handleGameStart = () => {
    if (gameStarted) {
      console.log("Termina Jogo");
      setGameStarted(false);
    } 
    else {
      console.log("Inicia Jogo");
      setGameStarted(true);
      setTimer(0);
    }
  };

  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    setSelectedLevel(event.target.value);
    let newLevelDetails;

    switch(value){
      case '1':
        newLevelDetails = {
          numRows: 9,
          numCols: 9,
          numMines: 10
        };
        break;
      case '2':
        newLevelDetails = {
          numRows: 16,
          numCols: 16,
          numMines: 40
        };
        break;
      case '3':
        newLevelDetails = {
          numRows: 30,
          numCols: 16,
          numMines: 99
        };
        break;
      default:
        newLevelDetails = {
          numRows: 0,
          numCols: 0,
          numMines: 0
        };
    }

    setLevelDetails(newLevelDetails);
  };

  useEffect(() => {
    let interval;

    if (gameStarted) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else if (!gameStarted && timer !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameStarted, timer]);


  const gameInfo = (result, nFlags, numMines, nonMineFound) =>{
    if(result !== null){
      setGameStarted(false);
    }
    let minesLeft = numMines - nFlags;
    setMinesLeft(minesLeft);
    setResult(result);
    setNonMineFound(nonMineFound);
  };

  return(
    <div className="App">
      <Header />
      <ControlPanel onLevelChange={handleLevelChange} selectedLevel={selectedLevel} gameStarted={gameStarted} onGameStart={handleGameStart} timer={timer} minesLeft={minesLeft} /> 
      {result !== null && <GameOver result={result} timer={timer} level={selectedLevel} onGameStart={handleGameStart} nonMineFound={nonMineFound}/>}
      <Board levelDetails={levelDetails} gameStarted={gameStarted} gameInfo={gameInfo}/>
      <Footer />
    </div>
  )
}

export default App;