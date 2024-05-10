import React from "react";
import "./App.css"
import {useState, useEffect} from "react";

import Header from "./components/header/header-comp";
import Board from './components/board/board-comp';
import Footer from "./components/footer/footer-comp";

function App(){
  return(
    <div className="App">
      <Header />
      <Board />
      <Footer />
    </div>
  )
}

export default App;