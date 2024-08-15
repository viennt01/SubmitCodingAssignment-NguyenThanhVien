import React, { useState } from "react";
import "./App.css";
import BoxPlay from "./components/BoxPlay";
import Control from "./components/Control";

function App() {
  const [numCircles, setNumCircles] = useState(5);
  const [startGame, setStartGame] = useState(false);
  const [noti, setNoti] = useState("LET'S PLAY");
  const [time, setTime] = useState(0);

  return (
    <div className="App">
      <Control
        numCircles={numCircles}
        setNumCircles={setNumCircles}
        startGame={startGame}
        setStartGame={setStartGame}
        noti={noti}
        time={time}
        setTime={setTime}
      />

      <BoxPlay
        numCircles={numCircles}
        startGame={startGame}
        handleStartAndEndGame={(pre) => setStartGame(pre)}
        handleNoti={(preNoti) => setNoti(preNoti)}
        handleTimeUpdate={(time) => setTime(time)}
      />
    </div>
  );
}

export default App;
