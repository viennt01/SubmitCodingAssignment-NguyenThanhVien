import React from "react";
import { formatTime } from "../until";

function Control({
  numCircles,
  setNumCircles,
  startGame,
  setStartGame,
  noti,
  time,
  setTime,
}) {
  return (
    <div>
      <h1
        style={{
          marginTop: "0",
          color:
            noti === "LET'S PLAY"
              ? "black"
              : noti === "ALL CLEARED"
              ? "green"
              : "red",
        }}
      >
        {noti}
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            width: "150px",
            margin: "4px",
          }}
        >
          Points:
        </h3>
        <input
          type="number"
          value={numCircles}
          onChange={(e) => setNumCircles(Number(e.target.value))}
          min="1"
          style={{
            height: "16px",
            padding: "5px",
            fontSize: "16px",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            width: "150px",
            margin: "4px",
          }}
        >
          Time:
        </h3>
        <p
          style={{
            height: "16px",
            padding: "5px",
            fontSize: "16px",
          }}
        >
          {formatTime(time)}
        </p>
      </div>

      <button
        onClick={() => {
          setTime(0);
          setStartGame(false);
          setTimeout(() => {
            setStartGame(true);
          }, 0);
        }}
        style={{
          padding: "5px 10px",
          fontSize: "16px",
          width: 100,
          margin: "4px",
        }}
      >
        {startGame ? "Restart" : "Play"}
      </button>
    </div>
  );
}

export default Control;
